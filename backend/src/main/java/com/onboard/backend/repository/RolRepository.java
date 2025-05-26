package com.onboard.backend.repository;

import com.onboard.backend.entity.Rol;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RolRepository extends MongoRepository<Rol, String> {
}
