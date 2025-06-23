package com.onboard.backend.service;

import com.onboard.backend.entity.Reserva;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.model.EstadoOferta;
import com.onboard.backend.repository.ReservaRepository;
import com.onboard.backend.util.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VehiculoService vehiculoService;

    @Autowired
    private UsuarioService usuarioService;

    public Reserva saveReserva(Reserva reserva) {

        usuarioService.getUsuarioById(reserva.getIdCliente()).get();

        vehiculoService.getVehiculoById(reserva.getIdVehiculo()).get();

        if (reserva.getFechaInicio() == null || reserva.getFechaFin() == null) {
            throw new InvalidInputException("Missing dates", "MISSING_DATES",
                    "You must provide both start and end dates");
        }

        if (reserva.getFechaFin().isBefore(reserva.getFechaInicio())) {
            throw new InvalidInputException("Invalid period", "INVALID_DATES",
                    "The end date cannot be earlier than the start date");
        }

        if (!ValidationUtils.isValidDireccion(reserva.getLugarRecogida())) {
            throw new InvalidInputException("Invalid pickup location", "INVALID_PICKUP",
                    "The pickup location must be at least 5 characters long");
        }

        if (!ValidationUtils.isValidDireccion(reserva.getLugarEntrega())) {
            throw new InvalidInputException("Invalid delivery location", "INVALID_DELIVERY",
                    "The delivery location must be at least 5 characters long");
        }

        reserva.setEstadoReserva(EstadoOferta.ACTIVA);

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
