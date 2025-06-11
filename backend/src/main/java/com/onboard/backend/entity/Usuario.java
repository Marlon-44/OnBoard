package com.onboard.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String idUsuario;

    private String nombre;
    private String correo;
    private String password;
    private String telefono;
    private String direccion;
    private LocalDateTime fechaRegistro;
    private String cuentaBancaria;
    private String idRol;
    private String fotoPerfilUrl;

    public Usuario() {
    }

    public Usuario(String idUsuario, String nombre, String correo, String telefono, String direccion,
            LocalDateTime fechaRegistro, String cuentaBancaria, String idRol, String password,
            String fotoPerfilUrl) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaRegistro = fechaRegistro;
        this.cuentaBancaria = cuentaBancaria;
        this.idRol = idRol;
        this.password = password;
        this.fotoPerfilUrl = fotoPerfilUrl;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getCuentaBancaria() {
        return cuentaBancaria;
    }

    public void setCuentaBancaria(String cuentaBancaria) {
        this.cuentaBancaria = cuentaBancaria;
    }

    public String getIdRol() {
        return idRol;
    }

    public void setIdRol(String idRol) {
        this.idRol = idRol;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFotoPerfilUrl() {
    return fotoPerfilUrl;
}

public void setFotoPerfilUrl(String fotoPerfilUrl) {
    this.fotoPerfilUrl = fotoPerfilUrl;
}

}
