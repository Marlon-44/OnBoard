package com.onboard.backend.service;

import com.onboard.backend.dto.VehiculoFiltroDTO;
import com.onboard.backend.entity.EstadoOferta;
import com.onboard.backend.entity.EstadoVerificacion;
import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.repository.UsuarioRepository;
import com.onboard.backend.repository.VehiculoFiltroRepository;
import com.onboard.backend.repository.VehiculoRepository;
import com.onboard.backend.util.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.mongodb.core.query.Query;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Transactional
    public Vehiculo saveVehiculo(Vehiculo vehiculo,
            MultipartFile tecnomecanica,
            MultipartFile antecedentes,
            MultipartFile soat,
            MultipartFile[] fotos) throws IOException {

        if (!ValidationUtils.isValidPlaca(vehiculo.getPlaca())) {
            throw new InvalidInputException("Invalid license plate", "INVALID_VEHICLE_LICENSE_PLATE",
                    "Expected format: ABC123 or ABC1234");
        }

        if (!ValidationUtils.isValidTipoVehiculo(vehiculo.getTipoVehiculo())) {
            throw new InvalidInputException("Invalid vehicle type", "INVALID_VEHICLE_TYPE",
                    "Allowed types: Automóvil, Moto, Bus, Camión, Lancha, Bicicleta, Cuatrimoto.");
        }

        if (!ValidationUtils.isValidTipoTerreno(vehiculo.getTipoTerreno())) {
            throw new InvalidInputException("Invalid terrain type", "INVALID_TERRAIN_TYPE",
                    "Allowed types: Urbano, Rural, Mixto.");
        }

        if (!ValidationUtils.isValidMarca(vehiculo.getMarca())) {
            throw new InvalidInputException("Invalid vehicle brand", "INVALID_VEHICLE_BRAND",
                    "Brand must be a non-empty string. Example: 'Toyota'");
        }

        if (!ValidationUtils.isValidModelo(vehiculo.getModelo())) {
            throw new InvalidInputException("Invalid model", "INVALID_VEHICLE_MODEL",
                    "Model must be a non-empty string. Example: 'Corolla'");
        }

        if (!ValidationUtils.isValidAnio(vehiculo.getAnio())) {
            throw new InvalidInputException("Invalid year", "INVALID_VEHICLE_YEAR",
                    "Year must be between 1900 and current year.");
        }

        if (!ValidationUtils.isValidCapacidadPasajeros(vehiculo.getCapacidadPasajeros())) {
            throw new InvalidInputException("Invalid passenger capacity", "INVALID_PASSENGER_CAPACITY",
                    "Must be a positive integer.");
        }

        if (!ValidationUtils.isValidTransmision(vehiculo.getTipoTransmision())) {
            throw new InvalidInputException("Invalid transmission type", "INVALID_TRANSMISSION_TYPE",
                    "Allowed: Manual, Automática.");
        }

        if (!ValidationUtils.isValidCombustible(vehiculo.getCombustible())) {
            throw new InvalidInputException("Invalid fuel type", "INVALID_FUEL_TYPE",
                    "Allowed: Gasolina, Diesel, Eléctrico, Híbrido, Gas.");
        }

        if (vehiculo.getPrecioPorDia() <= 0) {
            throw new InvalidInputException("Invalid daily price", "INVALID_DAILY_PRICE",
                    "The daily rental price must be greater than zero.");
        }

        if (!ValidationUtils.isValidKilometraje(vehiculo.getKilometraje())) {
            throw new InvalidInputException("Invalid mileage", "INVALID_MILEAGE",
                    "Must be a non-negative number.");
        }

        if (!ValidationUtils.isValidDescripcion(vehiculo.getDescripcion())) {
            throw new InvalidInputException("Invalid description", "INVALID_VEHICLE_DESCRIPTION",
                    "Must be 10–500 characters.");
        }

        if (!usuarioRepository.existsById(vehiculo.getIdPropietario())) {
            throw new InvalidInputException("Owner not found", "USER_NOT_FOUND",
                    "No user found with given ID.");
        }

        vehiculo.setFechaRegistro(LocalDateTime.now());
        vehiculo.setEstadoVerificacion(EstadoVerificacion.PENDIENTE);
        vehiculo.setEstadoOferta(EstadoOferta.INACTIVA);

        String urlTecno;
        String urlAnte;
        String urlSoat;
        List<String> urls;

        try {
            urlTecno = fileUploadService.uploadDocumentAsPdf(tecnomecanica, vehiculo.getIdPropietario(),
                    vehiculo.getPlaca(), "tecnomecanica.pdf");
        } catch (IOException e) {
            throw new InvalidInputException(
                    "Failed to upload 'tecnomecánica' document",
                    "TECNO_UPLOAD_FAILED",
                    "There was an error uploading the tecnomecánica PDF. Please try again.");
        }

        try {
            urlAnte = fileUploadService.uploadDocumentAsPdf(antecedentes, vehiculo.getIdPropietario(),
                    vehiculo.getPlaca(),
                    "antecedentes.pdf");
        } catch (IOException e) {
            throw new InvalidInputException(
                    "Failed to upload 'antecedentes' document",
                    "ANTECEDENTES_UPLOAD_FAILED",
                    "There was an error uploading the antecedentes PDF. Please try again.");
        }

        try {
            urlSoat = fileUploadService.uploadDocumentAsPdf(soat, vehiculo.getIdPropietario(), vehiculo.getPlaca(),
                    "soat.pdf");
        } catch (IOException e) {
            throw new InvalidInputException(
                    "Failed to upload 'SOAT' document",
                    "SOAT_UPLOAD_FAILED",
                    "There was an error uploading the SOAT PDF. Please try again.");
        }

        try {
            urls = fileUploadService.uploadVehiclePhotos(fotos, vehiculo.getPlaca());
        } catch (IOException e) {
            throw new InvalidInputException(
                    "Failed to upload vehicle photos",
                    "PHOTOS_UPLOAD_FAILED",
                    "There was an error uploading one or more vehicle photos. Please try again.");
        }

        vehiculo.setTecnomecanica(urlTecno);
        vehiculo.setAntecedentes(urlAnte);
        vehiculo.setSoat(urlSoat);

        if (vehiculo.getFotosUrls() == null) {
            vehiculo.setFotosUrls(new ArrayList<>());
        }
        vehiculo.getFotosUrls().addAll(urls);

        return vehiculoRepository.save(vehiculo);
    }

    public Optional<Vehiculo> getVehiculoById(String id) {
        Optional<Vehiculo> vehiculoOpt = vehiculoRepository.findById(id);
        if (vehiculoOpt.isEmpty()) {
            throw new InvalidInputException(
                    "Vehicle not found",
                    "VEHICLE_NOT_FOUND",
                    "No vehicle was found with the specified identifier or license plate.");

        }
        return vehiculoRepository.findById(id);
    }

    public List<Vehiculo> getAllVehiculos() {
        return vehiculoRepository.findAll();
    }

    public void deleteVehiculoById(String id) {
        Optional<Vehiculo> vehiculoOpt = vehiculoRepository.findById(id);
        if (vehiculoOpt.isEmpty()) {
            throw new InvalidInputException(
                    "Vehicle not found",
                    "VEHICLE_NOT_FOUND",
                    "No vehicle was found with the specified identifier or license plate.");

        }
        vehiculoRepository.deleteById(id);
    }

    public List<String> subirFotosVehiculo(String vehiculoId, MultipartFile[] files) throws IOException {
        List<String> urls = fileUploadService.uploadVehiclePhotos(files, vehiculoId);

        Optional<Vehiculo> vehiculoOpt = vehiculoRepository.findById(vehiculoId);
        if (vehiculoOpt.isEmpty()) {
            throw new InvalidInputException(
                    "Vehicle not found",
                    "VEHICLE_NOT_FOUND",
                    "No vehicle was found with the specified identifier or license plate.");

        }

        Vehiculo vehiculo = vehiculoOpt.get();
        if (vehiculo.getFotosUrls() == null) {
            vehiculo.setFotosUrls(new ArrayList<>());
        }
        vehiculo.getFotosUrls().addAll(urls);

        vehiculoRepository.save(vehiculo);

        return urls;
    }

    public Vehiculo updateVehiculo(String placa, Vehiculo vehiculoActualizado) {
        Optional<Vehiculo> vehiculoOpt = vehiculoRepository.findById(placa);

        if (vehiculoOpt.isEmpty()) {
            throw new InvalidInputException(
                    "Vehicle not found",
                    "VEHICLE_NOT_FOUND",
                    "No vehicle was found with the specified identifier or license plate.");
        }

        Vehiculo vehiculoExistente = vehiculoOpt.get();

        vehiculoExistente.setTipoVehiculo(vehiculoActualizado.getTipoVehiculo());
        vehiculoExistente.setTipoTerreno(vehiculoActualizado.getTipoTerreno());
        vehiculoExistente.setMarca(vehiculoActualizado.getMarca());
        vehiculoExistente.setModelo(vehiculoActualizado.getModelo());
        vehiculoExistente.setAnio(vehiculoActualizado.getAnio());
        vehiculoExistente.setCapacidadPasajeros(vehiculoActualizado.getCapacidadPasajeros());
        vehiculoExistente.setAntecedentes(vehiculoActualizado.getAntecedentes());
        vehiculoExistente.setTipoTransmision(vehiculoActualizado.getTipoTransmision());
        vehiculoExistente.setCombustible(vehiculoActualizado.getCombustible());
        vehiculoExistente.setKilometraje(vehiculoActualizado.getKilometraje());
        vehiculoExistente.setDescripcion(vehiculoActualizado.getDescripcion());
        vehiculoExistente.setEstadoOferta(vehiculoActualizado.getEstadoOferta());
        vehiculoExistente.setPrecioPorDia(vehiculoActualizado.getPrecioPorDia());

        return vehiculoRepository.save(vehiculoExistente);
    }

    public List<Vehiculo> getTop6VehiculosMasAlquilados() {
        return vehiculoRepository.findTop6ByOrderByCantidadAlquilerDesc();
    }

    public List<Vehiculo> getTop6VehiculosRecientes() {
        return vehiculoRepository.findTop6ByOrderByFechaRegistroDesc();
    }

    @Autowired
    private VehiculoFiltroRepository vehiculoFiltroRepository;

    public List<Vehiculo> buscarPorFiltros(VehiculoFiltroDTO filtros) {
        return vehiculoFiltroRepository.filtrarVehiculos(filtros);
    }

    public List<String> obtenerVehiculosPorPrecio(Double precioMin, Double precioMax) {
        Criteria estadoActiva = Criteria.where("estadoOferta").is(EstadoOferta.ACTIVA.name());

        Criteria rangoPrecio = new Criteria();
        if (precioMin != null && precioMax != null) {
            rangoPrecio = Criteria.where("precioPorDia").gte(precioMin).lte(precioMax);
        } else if (precioMin != null) {
            rangoPrecio = Criteria.where("precioPorDia").gte(precioMin);
        } else if (precioMax != null) {
            rangoPrecio = Criteria.where("precioPorDia").lte(precioMax);
        }

        Query query = new Query();
        if (precioMin != null || precioMax != null) {
            query.addCriteria(new Criteria().andOperator(estadoActiva, rangoPrecio));
        } else {
            query.addCriteria(estadoActiva);
        }

        query.fields().include("placa");

        return mongoTemplate.find(query, Vehiculo.class)
                .stream()
                .map(Vehiculo::getPlaca)
                .distinct()
                .collect(Collectors.toList());
    }

    public List<String> obtenerVehiculosConOfertaActiva() {
        return vehiculoRepository.findAll().stream()
                .filter(v -> v.getEstadoOferta() == EstadoOferta.ACTIVA)
                .map(Vehiculo::getPlaca)
                .distinct()
                .toList();
    }

    public List<Vehiculo> obtenerVehiculosOrdenadosPorFecha() {
        return vehiculoRepository.findAllByOrderByFechaRegistroDesc();
    }

}
