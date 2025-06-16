package com.onboard.backend.repository;

import com.onboard.backend.entity.Alquiler;
import com.onboard.backend.entity.EstadoAlquiler;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlquilerRepository extends MongoRepository<Alquiler, String> {
    List<Alquiler> findByEstado(EstadoAlquiler estado);
}
