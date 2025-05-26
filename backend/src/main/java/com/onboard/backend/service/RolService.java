package com.onboard.backend.service;

import com.onboard.backend.entity.Rol;
import com.onboard.backend.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    public Rol saveRol(Rol rol) {
        return rolRepository.save(rol);
    }

    public Optional<Rol> getRolById(String idRol) {
        return rolRepository.findById(idRol);
    }

    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    public void deleteRolById(String idRol) {
        rolRepository.deleteById(idRol);
    }
}
