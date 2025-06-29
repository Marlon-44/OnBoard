package com.onboard.backend.service;

import com.onboard.backend.entity.Reserva;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.model.EstadoOferta;
import com.onboard.backend.repository.ReservaRepository;
import com.onboard.backend.util.ValidationUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

        ValidationUtils.validarCoordenadasCartagena(reserva.getLugarEntregaYRecogida());

        reserva.setEstadoReserva(EstadoOferta.PENDIENTE);

        return reservaRepository.save(reserva);

    }

    public Optional<Reserva> getReservaById(String idReserva) {
        Optional<Reserva> reserva = reservaRepository.findById(idReserva);
        if (reserva.isEmpty()) {
            throw new InvalidInputException(
                    "Reserva not found",
                    "RESERVA_NOT_FOUND",
                    "No reservation was found with the provided ID: " + idReserva);
        }
        return reserva;
    }

    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    public void deleteReservaById(String idReserva) {
        reservaRepository.deleteById(idReserva);
    }

    public List<Reserva> getAllReservasByIdCliente(String idCliente) {
        return reservaRepository.findAllByIdCliente(idCliente);
    }

    public List<String> getFechasReservadasPorVehiculo(String idVehiculo) {
        List<Reserva> reservas = reservaRepository.findAllByIdVehiculo(idVehiculo);

        return reservas.stream()
                .flatMap(reserva -> {
                    LocalDate start = reserva.getFechaInicio().toLocalDate();
                    LocalDate end = reserva.getFechaFin().toLocalDate();
                    return start.datesUntil(end.plusDays(1))
                            .map(LocalDate::toString);
                })
                .distinct()
                .toList();
    }

}
