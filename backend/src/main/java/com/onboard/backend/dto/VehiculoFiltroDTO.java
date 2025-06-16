package com.onboard.backend.dto;

public class VehiculoFiltroDTO {

    private String tipoVehiculo;
    private String tipoTerreno;
    private String tipoTransmision;
    private String combustible;

    private Integer pasajerosExacto;
    private Integer pasajerosMin;
    private Integer pasajerosMax;

    private Float precioMin;
    private Float precioMax;

    private Boolean ordenarPorFechaDesc;
    private Boolean ordenarPorAlquilerDesc;

    private Integer anioMin;
    private Integer anioMax;

    public Integer getAnioMin() {
        return anioMin;
    }

    public void setAnioMin(Integer anioMin) {
        this.anioMin = anioMin;
    }

    public Integer getAnioMax() {
        return anioMax;
    }

    public void setAnioMax(Integer anioMax) {
        this.anioMax = anioMax;
    }

    public VehiculoFiltroDTO() {
    }

    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public String getTipoTerreno() {
        return tipoTerreno;
    }

    public void setTipoTerreno(String tipoTerreno) {
        this.tipoTerreno = tipoTerreno;
    }

    public String getTipoTransmision() {
        return tipoTransmision;
    }

    public void setTipoTransmision(String tipoTransmision) {
        this.tipoTransmision = tipoTransmision;
    }

    public String getCombustible() {
        return combustible;
    }

    public void setCombustible(String combustible) {
        this.combustible = combustible;
    }

    public Integer getPasajerosExacto() {
        return pasajerosExacto;
    }

    public void setPasajerosExacto(Integer pasajerosExacto) {
        this.pasajerosExacto = pasajerosExacto;
    }

    public Integer getPasajerosMin() {
        return pasajerosMin;
    }

    public void setPasajerosMin(Integer pasajerosMin) {
        this.pasajerosMin = pasajerosMin;
    }

    public Integer getPasajerosMax() {
        return pasajerosMax;
    }

    public void setPasajerosMax(Integer pasajerosMax) {
        this.pasajerosMax = pasajerosMax;
    }

    public Float getPrecioMin() {
        return precioMin;
    }

    public void setPrecioMin(Float precioMin) {
        this.precioMin = precioMin;
    }

    public Float getPrecioMax() {
        return precioMax;
    }

    public void setPrecioMax(Float precioMax) {
        this.precioMax = precioMax;
    }

    public Boolean getOrdenarPorFechaDesc() {
        return ordenarPorFechaDesc;
    }

    public void setOrdenarPorFechaDesc(Boolean ordenarPorFechaDesc) {
        this.ordenarPorFechaDesc = ordenarPorFechaDesc;
    }

    public Boolean getOrdenarPorAlquilerDesc() {
        return ordenarPorAlquilerDesc;
    }

    public void setOrdenarPorAlquilerDesc(Boolean ordenarPorAlquilerDesc) {
        this.ordenarPorAlquilerDesc = ordenarPorAlquilerDesc;
    }
}
