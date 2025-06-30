import axios from "axios";
const API = "http://localhost:8080/api";

/*
export const crearFactura = (facturaData) =>
  axios.post(`${API}/facturas`, facturaData);
*/
export const crearFactura = async (facturaData) => {
  console.log("Mock de factura enviada:", facturaData);
  return {
    data: {
      idFactura: "mock-id-999"
    }
  };
};
