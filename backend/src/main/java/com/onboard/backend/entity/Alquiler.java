package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "alquileres")
public class Alquiler {

    @Id
    private String idAlquiler;
    private String idReserva;
    private String estado;

    public Alquiler() {}

    public Alquiler(String idAlquiler, String idReserva, String estado) {
        this.idAlquiler = idAlquiler;
        this.idReserva = idReserva;
        this.estado = estado;
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

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
