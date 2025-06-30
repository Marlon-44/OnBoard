import axios from "axios";
const API = "http://localhost:8080/api";

/*
export const crearReserva = (reservaData) =>
    axios.post(`${API}/reservas`, reservaData);
*/
export const crearReserva = async (reservaData) => {
    console.log("Mock de reserva enviada:", reservaData);
    return {
        data: {
            idReserva: "mock-id-123"
        }
    };
};

