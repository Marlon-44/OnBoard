package com.onboard.backend.repository;

import com.onboard.backend.entity.Vehiculo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehiculoRepository extends MongoRepository<Vehiculo, String> {
    List<Vehiculo> findTop6ByOrderByCantidadAlquilerDesc();
    List<Vehiculo> findTop6ByOrderByFechaRegistroDesc();
}
