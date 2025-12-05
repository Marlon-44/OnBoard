import axios from "axios";
import { API_ROOT } from "../const/api.js";
export async function getVehicles() {
  try {
    const response = await fetch(`${API_ROOT}/vehiculos`);
    if (!response.ok) {
      throw new Error("Error getting the vehicles");
    }
    const vehicles = await response.json();
    return vehicles;
  } catch (error) {
    console.error("error in: getVehicles()", error);
    return [];
  }
}
export async function actualizarEstadoVehiculo(placa, nuevoEstado) {
  const response = await fetch(
    `${API_ROOT}/vehiculos/${placa}/estado-oferta?estado=${nuevoEstado.toUpperCase()}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo actualizar el estado del vehículo");
  }

  return await response.json();
}

export async function getRequestedVehicles() {
  try {
    const response = await fetch(`${API_ROOT}/vehiculos/estado/pendientes`);
    if (!response.ok) {
      throw new Error("Error getting requested vehicles");
    }
    const vehicles = await response.json();
    return vehicles;
  } catch (error) {
    console.error("Error in: getRequestedVehicles()", error);
    return [];
  }
}

export const getVehiclesByOwner = async (idPropietario) => {
  try {
    const response = await axios.get(
      `${API_ROOT}/vehiculos/propietario/${idPropietario}/sin-estado`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener los vehículos del propietario ${idPropietario}:`,
      error
    );
    throw new Error("No se pudieron obtener los vehículos del propietario.");
  }
};
