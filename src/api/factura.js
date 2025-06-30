import axios from "axios";
const API = "http://localhost:8080/api";

export const obtenerFacturaPorReserva = async (idReserva) => {
    const response = await axios.get(`${API}/reservas/${idReserva}/factura`);
    return response.data; // debe contener la factura con idFactura
};
