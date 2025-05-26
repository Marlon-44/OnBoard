package com.onboard.backend.service;

import com.onboard.backend.entity.Empresa;
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
