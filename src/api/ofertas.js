export async function getOfertas(){
    try {
        const response = await fetch("http://localhost:8080/api/vehiculos");
        if (!response.ok) {
            throw new Error("Error getting the ofertas")
        }
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error("error in: getOfertas()", error);
        return[];
    }
    
}