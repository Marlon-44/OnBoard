package com.onboard.backend.repository;

import com.onboard.backend.entity.Oferta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OfertaRepository extends MongoRepository<Oferta, String> {
}
