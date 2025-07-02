import axios from "axios";

const API = "http://localhost:8080/api/reservas";


export async function getAllReservas(){
    try {
        const response = await fetch("http://localhost:8080/api/reservas");
        if (!response.ok) {
            throw new Error("Error getting the reservas")
        }
        const reservas = await response.json();
        return reservas;
    } catch (error) {
        console.error("error in: getAllReservas()", error);
        return[];
    }
}

export async function getReservasByUser(idUsuario) {
    try {
        const response = await fetch(`http://localhost:8080/api/reservas/reservas/${idUsuario}`);
        if (!response.ok) {
            throw new Error("Error al obtener las reservas del usuario");
        }
        const reservas = await response.json();
        return reservas;
    } catch (error) {
        console.error("Error en: getReservasByUser()", error);
        return [];
    }
}

export const crearReserva = async (reservaData) => {
    try {
        const response = await axios.post(API, reservaData);
        console.log("SE CREO EXITOSAMENTE LA RESERVA")
        return response; // contiene response.data con idReserva y demás info
    } catch (error) {
        console.error("Error creando reserva:", error);
        throw error;
    }
};


export const confirmarDisponibilidad = async (idVehiculo) => {
    console.log("idVehiculo: ", idVehiculo)
    try {
        const response = await axios.get(`${API}/fechas-reservadas`, {
            params: { idVehiculo }
        });
        console.log("fechas", response.data)
        return response.data; // Se espera que esto contenga fechas reservadas u otra lógica útil
    } catch (error) {
        console.error("Error al verificar disponibilidad:", error);
        throw error;
    }
};
// src/api/reserva.js


export const getReservasByPropietario = async (idPropietario) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/reservas/propietario/${idPropietario}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener las reservas del propietario ${idPropietario}:`, error);
        throw new Error("No se pudieron obtener las reservas del propietario.");
    }
};
