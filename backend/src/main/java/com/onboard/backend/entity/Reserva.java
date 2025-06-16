package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "reservas")
public class Reserva {

    @Id
    private String idReserva;
    private String idCliente;
    private String idVehiculo;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String lugarRecogida;
    private String lugarEntrega;
    private String estado;

    public Reserva() {}

    public Reserva(String idReserva, String idCliente, String idVehiculo, LocalDateTime fechaInicio,
                   LocalDateTime fechaFin, String lugarRecogida, String lugarEntrega, String estado) {
        this.idReserva = idReserva;
        this.idCliente = idCliente;
        this.idVehiculo = idVehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.lugarRecogida = lugarRecogida;
        this.lugarEntrega = lugarEntrega;
        this.estado = estado;
    }

    public String getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(String idReserva) {
        this.idReserva = idReserva;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public String getIdVehiculo() {
        return idVehiculo;
    }

    public void setIdVehiculo(String idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getLugarRecogida() {
        return lugarRecogida;
    }

    public void setLugarRecogida(String lugarRecogida) {
        this.lugarRecogida = lugarRecogida;
    }

    public String getLugarEntrega() {
        return lugarEntrega;
    }

    public void setLugarEntrega(String lugarEntrega) {
        this.lugarEntrega = lugarEntrega;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
