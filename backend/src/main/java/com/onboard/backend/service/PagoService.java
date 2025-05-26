package com.onboard.backend.service;

import com.onboard.backend.entity.Pago;
import com.onboard.backend.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    public Pago savePago(Pago pago) {
        return pagoRepository.save(pago);
    }

    public Optional<Pago> getPagoById(String id) {
        return pagoRepository.findById(id);
    }

    public List<Pago> getPagosByFacturaId(String idFactura) {
        return pagoRepository.findByIdFactura(idFactura);
    }

    public List<Pago> getAllPagos() {
        return pagoRepository.findAll();
    }

    public void deletePagoById(String id) {
        pagoRepository.deleteById(id);
    }
}
