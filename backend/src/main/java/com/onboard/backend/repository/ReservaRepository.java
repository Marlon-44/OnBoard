package com.onboard.backend.repository;

import com.onboard.backend.entity.Reserva;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReservaRepository extends MongoRepository<Reserva, String> {
}
