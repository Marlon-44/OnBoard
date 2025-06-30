import axios from "axios";

const API = "http://localhost:8080/api/reservas";

export const crearReserva = async (reservaData) => {
    try {
        const response = await axios.post(API, reservaData);
        return response; // contiene response.data con idReserva y demás info
    } catch (error) {
        console.error("Error creando reserva:", error);
        throw error;
    }
};
