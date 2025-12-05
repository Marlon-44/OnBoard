// src/api/registro.js
import axios from "axios";
import { API_ROOT } from "../const/api.js";
export const registrarUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT}/usuarios/registro`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error al registrar: ", error);
    throw error.response?.data || error;
  }
};
