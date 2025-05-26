package com.onboard.backend.repository;

import com.onboard.backend.entity.Alquiler;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlquilerRepository extends MongoRepository<Alquiler, String> {
}
