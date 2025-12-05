import axios from "axios";
import { API_ROOT } from "../const/api.js";

export const obtenerPagoPorFactura = async (idFactura) => {
  try {
    const response = await axios.get("");
    return response.data; // puede devolver null si no hay pago aún
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    return null; // manejar como no pagado
  }
};
