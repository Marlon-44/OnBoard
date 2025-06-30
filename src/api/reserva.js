import axios from "axios";

const API = "http://localhost:8080/api/reservas";

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
