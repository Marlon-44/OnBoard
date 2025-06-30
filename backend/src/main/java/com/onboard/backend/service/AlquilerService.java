package com.onboard.backend.service;

import com.onboard.backend.entity.Alquiler;
import com.onboard.backend.entity.Reserva;

import com.onboard.backend.model.EstadoAlquiler;
import com.onboard.backend.repository.AlquilerRepository;
import com.onboard.backend.repository.ReservaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.ArrayList;
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
        return alquilerRepository.findById(idAlquiler);
    }

    public List<Alquiler> getAllAlquileres() {
        return alquilerRepository.findAll();
    }

    public void deleteAlquilerById(String idAlquiler) {
        alquilerRepository.deleteById(idAlquiler);
    }

    @Scheduled(cron = "0 0 * * * *")
    public void verificarAlquileresRetrasados() {
        List<Alquiler> enCurso = alquilerRepository.findByEstado(EstadoAlquiler.EN_CURSO);
        LocalDateTime ahora = LocalDateTime.now();
        int contador = 0;
        List<String> idsVehiculosRetrasados = new ArrayList<>();

        for (Alquiler alquiler : enCurso) {
            Reserva reserva = reservaRepository.findById(alquiler.getIdReserva()).orElse(null);

            if (reserva != null && reserva.getFechaFin().isBefore(ahora)) {
                alquiler.setEstado(EstadoAlquiler.RETRASADO);
                alquilerRepository.save(alquiler);
                idsVehiculosRetrasados.add(reserva.getIdVehiculo());
                contador++;
            }
        }

        if (contador > 0) {
            schedulerLogger.info("Alquileres marcados como retrasados: {}. Vehículos afectados: {}", contador,
                    idsVehiculosRetrasados);
        }
    }

    @Scheduled(cron = "0 15 * * * *")
    public void verificarAlquileresNoDevueltos() {
        List<Alquiler> retrasados = alquilerRepository.findByEstado(EstadoAlquiler.RETRASADO);
        LocalDateTime ahora = LocalDateTime.now();
        int contador = 0;
        List<String> idsAlquileresNoDevueltos = new ArrayList<>();

        for (Alquiler alquiler : retrasados) {
            LocalDateTime fechaNovedad = alquiler.getFechaNovedad();

            if (fechaNovedad != null && fechaNovedad.plusHours(3).isBefore(ahora)) {
                alquiler.setEstado(EstadoAlquiler.NO_DEVUELTO);
                alquiler.setFechaNovedad(LocalDateTime.now());
                alquilerRepository.save(alquiler);
                idsAlquileresNoDevueltos.add(alquiler.getIdAlquiler());
                contador++;
            }
        }

        if (contador > 0) {
            schedulerLogger.info("Alquileres marcados como NO_DEVUELTO: {}. Alquileres afectados: {}",
                    contador, idsAlquileresNoDevueltos);
        }
    }

}
