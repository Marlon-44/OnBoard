package com.onboard.backend.service;

import com.onboard.backend.entity.Reserva;
import com.onboard.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva saveReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public Optional<Reserva> getReservaById(String idReserva) {
        return reservaRepository.findById(idReserva);
    }

    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    public void deleteReservaById(String idReserva) {
        reservaRepository.deleteById(idReserva);
    }
}
