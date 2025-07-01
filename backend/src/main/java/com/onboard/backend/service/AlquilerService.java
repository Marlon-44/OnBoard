package com.onboard.backend.service;

import com.onboard.backend.entity.Alquiler;
import com.onboard.backend.entity.Reserva;
import com.onboard.backend.exception.InvalidInputException;
import com.onboard.backend.model.EstadoAlquiler;
import com.onboard.backend.repository.AlquilerRepository;
import com.onboard.backend.repository.ReservaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AlquilerService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private AlquilerRepository alquilerRepository;

    private static final Logger schedulerLogger = LoggerFactory.getLogger(AlquilerService.class);

    public Alquiler saveAlquiler(Alquiler alquiler) {

        return alquilerRepository.save(alquiler);
    }

    public Optional<Alquiler> getAlquilerById(String idAlquiler) {
        Optional<Alquiler> alquiler = alquilerRepository.findById(idAlquiler);
        if (alquiler.isEmpty()) {
            throw new InvalidInputException(
                    "Alquiler no encontrado",
                    "ALQUILER_NOT_FOUND",
                    "No se encontró un alquiler con el ID proporcionado: " + idAlquiler);
        }
        return alquiler;
    }

    public List<Alquiler> getAllAlquileres() {
        return alquilerRepository.findAll();
    }

    public void deleteAlquilerById(String idAlquiler) {
        alquilerRepository.deleteById(idAlquiler);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void actualizarEstadosDeAlquileres() {
        LocalDateTime ahora = LocalDateTime.now();
        int contadorRetrasados = 0;
        int contadorNoDevueltos = 0;
        int contadorDanados = 0;
        int contadorIncidentes = 0;

        List<Alquiler> alquileres = alquilerRepository.findAll();

        for (Alquiler alquiler : alquileres) {
            Optional<Reserva> reservaOpt = reservaRepository.findById(alquiler.getIdReserva());
            if (reservaOpt.isEmpty())
                continue;

            Reserva reserva = reservaOpt.get();

            switch (alquiler.getEstado()) {
                case EN_CURSO:
                    if (reserva.getFechaFin().isBefore(ahora)) {
                        alquiler.setEstado(EstadoAlquiler.RETRASADO);
                        alquilerRepository.save(alquiler);
                        contadorRetrasados++;
                    }
                    break;

                case RETRASADO:
                    if (alquiler.getFechaNovedad() != null &&
                            alquiler.getFechaNovedad().plusHours(3).isBefore(ahora)) {
                        alquiler.setEstado(EstadoAlquiler.NO_DEVUELTO);
                        alquiler.setFechaNovedad(ahora);
                        alquilerRepository.save(alquiler);
                        contadorNoDevueltos++;
                    }
                    break;

                case CONFIRMADO:
                    if (reserva.getFechaInicio().isBefore(ahora)) {
                        alquiler.setEstado(EstadoAlquiler.EN_CURSO);
                        alquiler.setFechaNovedad(ahora);
                        alquilerRepository.save(alquiler);
                    }
                    break;

                case VEHICULO_DANADO:
                    contadorDanados++;
                    break;

                case INCIDENTE_GRAVE:
                    contadorIncidentes++;
                    break;
                default:
                    continue;
            }
        }

        schedulerLogger.info("Actualización de estados de alquileres completada:");
        schedulerLogger.info("→ RETRASADOS: {}", contadorRetrasados);
        schedulerLogger.info("→ NO_DEVUELTO: {}", contadorNoDevueltos);
        schedulerLogger.info("→ VEHICULO_DANADO: {}", contadorDanados);
        schedulerLogger.info("→ INCIDENTE_GRAVE: {}", contadorIncidentes);
    }

    public Optional<Alquiler> getAlquilerByIdReserva(String idReserva) {
        return alquilerRepository.findByIdReserva(idReserva);
    }

}
