import { API_ROOT } from "../const/api.js";
export async function getFeaturedVehicles() {
  try {
    const response = await fetch(`${API_ROOT}/vehiculos/top6Alquiler`);
    if (!response.ok) {
      throw new Error("Error getting the featured vehicles");
    }
    const vehicles = await response.json();
    return vehicles;
  } catch (error) {
    console.error("error in: getFeaturedVehicles()", error);
    return [];
  }
}
