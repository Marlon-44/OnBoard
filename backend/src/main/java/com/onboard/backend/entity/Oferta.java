package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ofertas")
public class Oferta {

    @Id
    private String idOferta;

    private String idVehiculo;

    private String estadoOferta;

    private float precioPorDia;

    public Oferta() {}

    public Oferta(String idOferta, String idVehiculo, String estadoOferta, float precioPorDia) {
        this.idOferta = idOferta;
        this.idVehiculo = idVehiculo;
        this.estadoOferta = estadoOferta;
        this.precioPorDia = precioPorDia;
    }

    public String getIdOferta() {
        return idOferta;
    }

    public void setIdOferta(String idOferta) {
        this.idOferta = idOferta;
    }

    public String getIdVehiculo() {
        return idVehiculo;
    }

    public void setIdVehiculo(String idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public String getEstadoOferta() {
        return estadoOferta;
    }

    public void setEstadoOferta(String estadoOferta) {
        this.estadoOferta = estadoOferta;
    }

    public float getPrecioPorDia() {
        return precioPorDia;
    }

    public void setPrecioPorDia(float precioPorDia) {
        this.precioPorDia = precioPorDia;
    }
}
