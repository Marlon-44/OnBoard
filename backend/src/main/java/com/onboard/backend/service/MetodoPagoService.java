package com.onboard.backend.service;

import com.onboard.backend.entity.MetodoPago;
import com.onboard.backend.repository.MetodoPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoService {

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    public MetodoPago saveMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepository.save(metodoPago);
    }

    public Optional<MetodoPago> getMetodoPagoById(String id) {
        return metodoPagoRepository.findById(id);
    }

    public List<MetodoPago> getAllMetodosPago() {
        return metodoPagoRepository.findAll();
    }

    public void deleteMetodoPagoById(String id) {
        metodoPagoRepository.deleteById(id);
    }
}
