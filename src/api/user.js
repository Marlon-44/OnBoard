export async function getRequestedUsers() {
    try {
        const response = await fetch("http://localhost:8080/api/usuarios/pendientes");
        if (!response.ok) {
            throw new Error("Error getting requested Users");
        }
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error("Error in: getRequestedUsers()", error);
        return [];
    }
}