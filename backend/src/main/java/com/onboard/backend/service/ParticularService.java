package com.onboard.backend.service;

import com.onboard.backend.entity.Particular;
import com.onboard.backend.repository.ParticularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticularService {

    @Autowired
    private ParticularRepository particularRepository;

    public Particular saveParticular(Particular particular) {
        return particularRepository.save(particular);
    }

    public Optional<Particular> getParticularById(String idUsuario) {
        return particularRepository.findById(idUsuario);
    }

    public List<Particular> getAllParticulares() {
        return particularRepository.findAll();
    }

    public void deleteParticularById(String idUsuario) {
        particularRepository.deleteById(idUsuario);
    }
}
