export async function getAllAlquileres() {
    try {
        const response = await fetch("http://localhost:8080/api/alquileres");
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
        const response = await fetch(`http://localhost:8080/api/alquileres/usuario/${idUsuario}`);
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
