
export async function getFeaturedVehicles(){
    try {
        const response = await fetch("http://localhost:8080/api/vehiculos/top6Alquiler");
        if (!response.ok) {
            throw new Error("Error getting the featured vehicles")
        }
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error("error in: getFeaturedVehicles()", error);
        return[];
    }
    
}