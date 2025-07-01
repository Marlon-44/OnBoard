package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.onboard.backend.model.EstadoAlquiler;

import java.time.LocalDateTime;

@Document(collection = "alquileres")
public class Alquiler {

    @Id
    private String idAlquiler;
    private String idReserva;
    private EstadoAlquiler estado;
    private LocalDateTime fechaNovedad;

    public Alquiler() {
    }

    public Alquiler(String idAlquiler, String idReserva, EstadoAlquiler estado, LocalDateTime fechaNovedad) {
        this.idAlquiler = idAlquiler;
        this.idReserva = idReserva;
        this.estado = estado;
        this.fechaNovedad = fechaNovedad;
    }

    public String getIdAlquiler() {
        return idAlquiler;
    }

    public void setIdAlquiler(String idAlquiler) {
        this.idAlquiler = idAlquiler;
    }

    public String getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(String idReserva) {
        this.idReserva = idReserva;
    }

    public EstadoAlquiler getEstado() {
        return estado;
    }

    public void setEstado(EstadoAlquiler estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaNovedad() {
        return fechaNovedad;
    }

    public void setFechaNovedad(LocalDateTime fechaNovedad) {
        this.fechaNovedad = fechaNovedad;
    }

}
