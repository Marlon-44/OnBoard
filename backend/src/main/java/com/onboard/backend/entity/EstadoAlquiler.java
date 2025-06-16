package com.onboard.backend.entity;

public enum EstadoAlquiler {
    CONFIRMADO,           // Aprobado, vehículo no entregado aún
    EN_CURSO,             // Vehículo entregado al cliente
    FINALIZADO,           // Vehículo devuelto correctamente
    RETRASADO,            // Cliente no ha devuelto el vehículo a tiempo
    NO_DEVUELTO,          // Cliente nunca devolvió el vehículo (se asume pérdida o robo)
    VEHICULO_DANADO,      // Vehículo devuelto con daños significativos
    ABANDONADO,           // Cliente abandonó el contrato o dejó el vehículo sin informar
    INCIDENTE_GRAVE       // Se reportó un accidente o situación legal importante durante el alquiler
}