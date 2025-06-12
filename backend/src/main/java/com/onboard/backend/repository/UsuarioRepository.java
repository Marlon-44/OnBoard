package com.onboard.backend.repository;

import com.onboard.backend.entity.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Usuario findByCorreo(String correo);
    boolean existsByCorreo(String correo);
    boolean existsById(@NonNull String id);
}
