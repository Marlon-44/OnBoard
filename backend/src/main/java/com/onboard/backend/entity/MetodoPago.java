package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "metodos_pago")
public class MetodoPago {

    @Id
    private String idMetodoPago;
    private String tipoMetodo;
    private String estado;

    public MetodoPago() {
    }

    public MetodoPago(String idMetodoPago, String tipoMetodo, String estado) {
        this.idMetodoPago = idMetodoPago;
        this.tipoMetodo = tipoMetodo;
        this.estado = estado;
    }

    public String getIdMetodoPago() {
        return idMetodoPago;
    }

    public void setIdMetodoPago(String idMetodoPago) {
        this.idMetodoPago = idMetodoPago;
    }

    public String getTipoMetodo() {
        return tipoMetodo;
    }

    public void setTipoMetodo(String tipoMetodo) {
        this.tipoMetodo = tipoMetodo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
