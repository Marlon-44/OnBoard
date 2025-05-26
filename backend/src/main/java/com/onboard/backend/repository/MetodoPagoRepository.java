package com.onboard.backend.repository;

import com.onboard.backend.entity.MetodoPago;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MetodoPagoRepository extends MongoRepository<MetodoPago, String> {
}
