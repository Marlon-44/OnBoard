package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "empresas")
public class Empresa {

    @Id
    private String id;

    private String idUsuario; 

    private String representante;
    private String cedulaRepresentante;

    public Empresa() {}

    public Empresa(String idUsuario, String representante, String cedulaRepresentante) {
        this.idUsuario = idUsuario;
        this.representante = representante;
        this.cedulaRepresentante = cedulaRepresentante;
    }

    public String getId() {
        return id;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getRepresentante() {
        return representante;
    }

    public void setRepresentante(String representante) {
        this.representante = representante;
    }

    public String getCedulaRepresentante() {
        return cedulaRepresentante;
    }

    public void setCedulaRepresentante(String cedulaRepresentante) {
        this.cedulaRepresentante = cedulaRepresentante;
    }
}
