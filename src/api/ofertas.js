import { API_ROOT } from "../const/api.js";
export async function getOfertas() {
  try {
    const response = await fetch(`${API_ROOT}/vehiculos/sorted-by-date-desc`);
    if (!response.ok) {
      throw new Error("Error getting the ofertas");
    }
    const vehicles = await response.json();
    return vehicles;
  } catch (error) {
    console.error("error in: getOfertas()", error);
    return [];
  }
}
