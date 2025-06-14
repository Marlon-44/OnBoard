package com.onboard.backend.service;

import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.repository.UsuarioRepository;
import com.onboard.backend.repository.VehiculoRepository;
import com.onboard.backend.util.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Vehiculo saveVehiculo(Vehiculo vehiculo) {
        if (!ValidationUtils.isValidPlaca(vehiculo.getPlaca())) {
            throw new InvalidInputException(
                    "Invalid license plate",
                    "INVALID_VEHICLE_LICENSE_PLATE",
                    "Expected format: 3 uppercase letters followed by 3 or 4 digits. Example: ABC123 or ABC1234");
        }

        if (!ValidationUtils.isValidTipoVehiculo(vehiculo.getTipoVehiculo())) {
            throw new InvalidInputException(
                    "Invalid vehicle type",
                    "INVALID_VEHICLE_TYPE",
                    "Allowed types: Automóvil, Moto, Bus, Camión, Lancha, Bicicleta, Cuatrimoto.");
        }

        if (!ValidationUtils.isValidTipoTerreno(vehiculo.getTipoTerreno())) {
            throw new InvalidInputException(
                    "Invalid terrain type",
                    "INVALID_TERRAIN_TYPE",
                    "Allowed types: Urbano, Rural, Mixto.");
        }

        if (!ValidationUtils.isValidMarca(vehiculo.getMarca())) {
            throw new InvalidInputException(
                    "Invalid vehicle brand",
                    "INVALID_VEHICLE_BRAND",
                    "Brand must be a non-empty string with valid characters. Example: 'Toyota'");
        }

        if (!ValidationUtils.isValidModelo(vehiculo.getModelo())) {
            throw new InvalidInputException(
                    "Invalid vehicle model",
                    "INVALID_VEHICLE_MODEL",
                    "Model must be a non-empty string. Example: 'Corolla'");
        }

        if (!ValidationUtils.isValidAnio(vehiculo.getAnio())) {
            throw new InvalidInputException(
                    "Invalid year",
                    "INVALID_VEHICLE_YEAR",
                    "Year must be between 1900 and current year. Example: 2022");
        }

        if (!ValidationUtils.isValidCapacidadPasajeros(vehiculo.getCapacidadPasajeros())) {
            throw new InvalidInputException(
                    "Invalid passenger capacity",
                    "INVALID_PASSENGER_CAPACITY",
                    "Must be a positive integer. Example: 5");
        }

        if (!ValidationUtils.isValidUrl(vehiculo.getSoat())) {
            throw new InvalidInputException(
                    "Invalid SOAT URL",
                    "INVALID_SOAT_URL",
                    "Must be a valid URL starting with http or https. Example: https://example.com/soat.pdf");
        }

        if (!ValidationUtils.isValidUrl(vehiculo.getTecnomecanica())) {
            throw new InvalidInputException(
                    "Invalid technomechanical review URL",
                    "INVALID_TECHNOMECHANICAL_URL",
                    "Must be a valid URL. Example: https://example.com/tecnomecanica.pdf");
        }

        if (!ValidationUtils.isValidUrl(vehiculo.getAntecedentes())) {
            throw new InvalidInputException(
                    "Invalid background check URL",
                    "INVALID_BACKGROUND_URL",
                    "Must be a valid URL. Example: https://example.com/antecedentes.pdf");
        }

        if (!ValidationUtils.isValidTransmision(vehiculo.getTipoTransmision())) {
            throw new InvalidInputException(
                    "Invalid transmission type",
                    "INVALID_TRANSMISSION_TYPE",
                    "Allowed values: Automática, Manual. Example: 'Manual'");
        }

        if (!ValidationUtils.isValidCombustible(vehiculo.getCombustible())) {
            throw new InvalidInputException(
                    "Invalid fuel type",
                    "INVALID_FUEL_TYPE",
                    "Allowed values: Gasolina, Diesel, Eléctrico, Híbrido, Gas.");
        }

        if (!ValidationUtils.isValidKilometraje(vehiculo.getKilometraje())) {
            throw new InvalidInputException(
                    "Invalid mileage",
                    "INVALID_MILEAGE",
                    "Mileage must be a non-negative number. Example: 154000.5");
        }

        if (!ValidationUtils.isValidDescripcion(vehiculo.getDescripcion())) {
            throw new InvalidInputException(
                    "Invalid description",
                    "INVALID_VEHICLE_DESCRIPTION",
                    "Description must be between 10 and 500 characters. Example: 'Vehículo en excelente estado, único dueño'");
        }

        if (!usuarioRepository.existsById(vehiculo.getIdPropietario())) {
            throw new InvalidInputException(
                    "Owner not found",
                    "USER_NOT_FOUND",
                    "No user found with the given ID. Example of valid ID: '1234567890'");
        }

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
        vehiculoActualizado.setPlaca(placa);
        return vehiculoRepository.save(vehiculoActualizado);
    }
}
