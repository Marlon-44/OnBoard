package com.onboard.backend.service;

import com.onboard.backend.entity.Factura;
import com.onboard.backend.entity.Reserva;
import com.onboard.backend.entity.Vehiculo;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.model.EstadoAlquiler;
import com.onboard.backend.model.EstadoReserva;
import com.onboard.backend.repository.ReservaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import com.onboard.backend.entity.Alquiler;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private VehiculoService vehiculoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private FacturaService facturaService;

    @Autowired
    private AlquilerService alquilerService;

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

        List<String> fechasReservadas = getFechasReservadasPorVehiculo(reserva.getIdVehiculo());
        LocalDate fechaInicio = reserva.getFechaInicio().toLocalDate();
        LocalDate fechaFin = reserva.getFechaFin().toLocalDate();

        boolean existeCruce = fechaInicio.datesUntil(fechaFin.plusDays(1))
                .map(LocalDate::toString)
                .anyMatch(fechasReservadas::contains);

        if (existeCruce) {
            throw new InvalidInputException("Fecha ocupada", "DATE_CONFLICT",
                    "One or more selected dates are already reserved for this vehicle.");
        }

        reserva.setEstadoReserva(EstadoReserva.PENDIENTE);
        Vehiculo vehiculo = vehiculoService.getVehiculoById(reserva.getIdVehiculo()).get();

        long horas = ChronoUnit.HOURS.between(reserva.getFechaInicio(), reserva.getFechaFin());
        float precioPorHora = vehiculo.getPrecioPorDia() / 24f;

        BigDecimal horasBD = BigDecimal.valueOf(horas);
        BigDecimal precioPorHoraBD = BigDecimal.valueOf(precioPorHora);

        BigDecimal total = horasBD.multiply(precioPorHoraBD).setScale(2, RoundingMode.HALF_UP);

        Reserva savedReserva = reservaRepository.save(reserva);

        Factura factura = new Factura();
        factura.setFechaEmision(LocalDate.now());
        factura.setIdReserva(savedReserva.getIdReserva());
        factura.setRazon("Pago Alquiler Vehiculo: " + vehiculo.getPlaca());
        factura.setEstadoPago("CREATED");
        factura.setTotal(total);
        facturaService.saveFactura(factura);

        return savedReserva;
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
                .filter(reserva -> reserva.getFechaInicio() != null && reserva.getFechaFin() != null)
                .flatMap(reserva -> {
                    LocalDate start = reserva.getFechaInicio().toLocalDate();
                    LocalDate end = reserva.getFechaFin().toLocalDate();
                    return start.datesUntil(end.plusDays(1))
                            .map(LocalDate::toString);
                })
                .distinct()
                .toList();

    }

    public Factura getFactura(String idReserva) {
        getReservaById(idReserva);
        return facturaService.getFacturaByIdReserva(idReserva);
    }

    @Scheduled(cron = "0 0 */4 * * *")
    public void crearAlquileresParaReservasDeManana() {
        LocalDateTime mañana = LocalDateTime.now().plusDays(1);
        List<Reserva> reservas = reservaRepository.findAll();

        for (Reserva reserva : reservas) {
            if (reserva.getFechaInicio() == null)
                continue;

            boolean esParaManana = reserva.getFechaInicio().isEqual(mañana);
            boolean estaActiva = reserva.getEstadoReserva() == EstadoReserva.ACTIVA;
            boolean alquilerYaExiste = alquilerService.getAlquilerById(reserva.getIdReserva()).isPresent();

            if (esParaManana && estaActiva && !alquilerYaExiste) {
                Alquiler alquiler = new Alquiler();
                alquiler.setFechaNovedad(LocalDateTime.now());
                alquiler.setEstado(EstadoAlquiler.CONFIRMADO);
                alquiler.setIdAlquiler(reserva.getIdReserva());
                alquilerService.saveAlquiler(alquiler);
            }
        }
    }

}
