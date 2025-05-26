package com.onboard.backend.service;

import com.onboard.backend.entity.Factura;
import com.onboard.backend.repository.FacturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;

    public Factura saveFactura(Factura factura) {
        return facturaRepository.save(factura);
    }

    public Optional<Factura> getFacturaById(String idFactura) {
        return facturaRepository.findById(idFactura);
    }

    public List<Factura> getAllFacturas() {
        return facturaRepository.findAll();
    }

    public void deleteFacturaById(String idFactura) {
        facturaRepository.deleteById(idFactura);
    }
}
