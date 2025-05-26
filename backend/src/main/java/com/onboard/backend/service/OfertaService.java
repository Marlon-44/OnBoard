package com.onboard.backend.service;

import com.onboard.backend.entity.Oferta;
import com.onboard.backend.repository.OfertaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfertaService {

    @Autowired
    private OfertaRepository ofertaRepository;

    public Oferta saveOferta(Oferta oferta) {
        return ofertaRepository.save(oferta);
    }

    public Optional<Oferta> getOfertaById(String id) {
        return ofertaRepository.findById(id);
    }

    public List<Oferta> getAllOfertas() {
        return ofertaRepository.findAll();
    }

    public void deleteOfertaById(String id) {
        ofertaRepository.deleteById(id);
    }
}
