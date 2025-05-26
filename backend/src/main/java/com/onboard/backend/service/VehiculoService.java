package com.onboard.backend.service;

import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

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
}
