import axios from "axios";
const API = "http://localhost:8080/api";

export const obtenerFacturaPorReserva = async (idReserva) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/reservas/${idReserva}/factura`);
        console.log("Exito, factura: ", response.data)
        return response.data; // Se espera que contenga la factura con idFactura
    } catch (error) {
        console.error(`Error al obtener la factura para la reserva ${idReserva}:`, error);
        throw new Error("No se pudo obtener la factura desde el servidor.");
    }
};

