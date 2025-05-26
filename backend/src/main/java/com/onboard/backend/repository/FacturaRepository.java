package com.onboard.backend.repository;

import com.onboard.backend.entity.Factura;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacturaRepository extends MongoRepository<Factura, String> {
}
