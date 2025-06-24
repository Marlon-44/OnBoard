
export async function getVehicles(){
    try {
        const response = await fetch("http://localhost:8080/api/vehiculos");
        if (!response.ok) {
            throw new Error("Error getting the vehicles")
        }
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error("error in: getVehicles()", error);
        return[];
    }
    
}

export async function getRequestedVehicles() {
    try {
        const response = await fetch("http://localhost:8080/api/vehiculos/estado/pendientes");
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