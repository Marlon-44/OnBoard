// src/api/paypal.js
import { API_ROOT } from "../const/api.js";
export const crearOrdenPaypal = async (idFactura) => {
  const response = await fetch(
    `${API_ROOT}/pagos/crear?idFactura=${idFactura}`,
    { method: "POST" }
  );

  if (!response.ok) {
    throw new Error("Error al crear la orden de PayPal");
  }

  return response.json();
};
