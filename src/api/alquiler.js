import axios from "axios";
import { API_ROOT } from "../const/api.js";

export async function getAllAlquileres() {
  try {
    const response = await fetch(`${API_ROOT}/alquileres`);
    if (!response.ok) {
      throw new Error("Error al obtener todos los alquileres");
    }
    const alquileres = await response.json();
    return alquileres;
  } catch (error) {
    console.error("Error en: getAllAlquileres()", error);
    return [];
  }
}
export async function getAlquileresByUser(idUsuario) {
  try {
    const response = await fetch(`${API_ROOT}/alquileres/usuario/${idUsuario}`);
    if (!response.ok) {
      throw new Error("Error al obtener los alquileres del usuario");
    }
    const alquileres = await response.json();
    return alquileres;
  } catch (error) {
    console.error("Error en: getAlquileresByUser()", error);
    return [];
  }
}
// src/api/alquiler.js

export const obtenerAlquileresConfirmadosPorPropietario = async (
  idPropietario
) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/alquileres/propietario/${idPropietario}/estado/CONFIRMADO`
    );
    console.log("Alquileres confirmados:", response.data);
    return response.data; // Array de alquileres con estado CONFIRMADO
  } catch (error) {
    console.error("Error al obtener alquileres confirmados:", error);
    throw new Error("No se pudieron cargar los alquileres confirmados.");
  }
};

export const finalizarAlquiler = async (idAlquiler) => {
  try {
    const response = await axios.put(
      `${API_ROOT}/alquileres/${idAlquiler}/estado?nuevoEstado=FINALIZADO`
    );
    console.log("Alquiler finalizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al finalizar el alquiler:", error);
    throw new Error("No se pudo finalizar el alquiler.");
  }
};

export const obtenerAlquileresPorPropietario = async (idPropietario) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/alquileres/propietario/${idPropietario}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener alquileres del propietario ${idPropietario}:`,
      error
    );
    throw new Error("No se pudieron obtener los alquileres del propietario.");
  }
};

export const getAllAlquileresByCliente = async (idCliente) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/alquileres/cliente/${idCliente}`
    );
    console.log("Alquileres del cliente:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los alquileres del cliente:", error);
    throw new Error("No se pudieron obtener los alquileres.");
  }
};

export const getAlquileresActivosByCliente = async (idCliente) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/alquileres/cliente/${idCliente}/activos`
    );
    console.log("Alquileres activos del cliente:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los alquileres activos del cliente:",
      error
    );
    throw new Error("No se pudieron obtener los alquileres activos.");
  }
};
