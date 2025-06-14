package com.onboard.backend.service;

import com.onboard.backend.entity.Empresa;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa saveEmpresa(Empresa empresa) {
        if (empresa.getIdUsuario() == null || empresa.getIdUsuario().trim().isEmpty()) {
            throw new InvalidInputException("Invalid user ID", "INVALID_USER_ID",
                    "The user ID cannot be null or empty.");
        }

        if (empresa.getRepresentante() == null || empresa.getRepresentante().trim().isEmpty()) {
            throw new InvalidInputException("Invalid representative name", "INVALID_REPRESENTATIVE",
                    "The representative name cannot be null or empty.");
        }

        if (empresa.getRepresentante().length() < 3 || empresa.getRepresentante().length() > 100) {
            throw new InvalidInputException("Invalid representative name length", "INVALID_REPRESENTATIVE_LENGTH",
                    "Representative name must be between 3 and 100 characters.");
        }

        if (empresa.getCedulaRepresentante() == null || !empresa.getCedulaRepresentante().matches("^\\d{6,10}$")) {
            throw new InvalidInputException("Invalid ID number", "INVALID_CEDULA",
                    "The ID number must contain between 6 and 10 digits.");
        }

        if (empresaRepository.existsById(empresa.getIdUsuario())) {
            throw new InvalidInputException("Empresa already exists", "EMPRESA_ALREADY_EXISTS",
                    "An empresa with this user ID already exists.");
        }

        return empresaRepository.save(empresa);
    }

    public Optional<Empresa> getEmpresaById(String idUsuario) {
        return empresaRepository.findById(idUsuario);
    }

    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    public void deleteEmpresaById(String idUsuario) {
        empresaRepository.deleteById(idUsuario);
    }
}
