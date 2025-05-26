package com.onboard.backend.service;

import com.onboard.backend.entity.Alquiler;
import com.onboard.backend.repository.AlquilerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlquilerService {

    @Autowired
    private AlquilerRepository alquilerRepository;

    public Alquiler saveAlquiler(Alquiler alquiler) {
        return alquilerRepository.save(alquiler);
    }

    public Optional<Alquiler> getAlquilerById(String idAlquiler) {
        return alquilerRepository.findById(idAlquiler);
    }

    public List<Alquiler> getAllAlquileres() {
        return alquilerRepository.findAll();
    }

    public void deleteAlquilerById(String idAlquiler) {
        alquilerRepository.deleteById(idAlquiler);
    }
}
