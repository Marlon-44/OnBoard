package com.onboard.backend.repository;

import com.onboard.backend.entity.Vehiculo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehiculoRepository extends MongoRepository<Vehiculo, String> {
}
