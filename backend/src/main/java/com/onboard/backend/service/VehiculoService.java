package com.onboard.backend.service;

import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.repository.VehiculoRepository;
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

    public Vehiculo saveVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public Optional<Vehiculo> getVehiculoById(String id) {
        return vehiculoRepository.findById(id);
    }

    public List<Vehiculo> getAllVehiculos() {
        return vehiculoRepository.findAll();
    }

    public void deleteVehiculoById(String id) {
        vehiculoRepository.deleteById(id);
    }

    public List<String> subirFotosVehiculo(String vehiculoId, MultipartFile[] files) throws IOException {
        List<String> urls = fileUploadService.uploadVehiclePhotos(files, vehiculoId);

        Optional<Vehiculo> vehiculoOpt = vehiculoRepository.findById(vehiculoId);
        if (vehiculoOpt.isEmpty()) {
            throw new IllegalArgumentException("Vehículo no encontrado");
        }

        Vehiculo vehiculo = vehiculoOpt.get();
        if (vehiculo.getFotosUrls() == null) {
            vehiculo.setFotosUrls(new ArrayList<>());
        }
        vehiculo.getFotosUrls().addAll(urls);

        vehiculoRepository.save(vehiculo);

        return urls;
    }
}
