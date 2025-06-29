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

export async function getUsers() {
    try {
        const response = await fetch("http://localhost:8080/api/usuarios");
        if (!response.ok) {
            throw new Error("Error getting Users");
        }
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error("Error in: getUsers()", error);
        return [];
    }
}

// src/api/usuarios.js

export async function actualizarEstadoUsuario(idUsuario, nuevoEstado) {
    try {
        const response = await fetch(`http://localhost:8080/api/usuarios/verificacion/${idUsuario}?estado=${nuevoEstado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el estado a '${nuevoEstado}'`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en actualizarEstadoUsuario:', error);
        throw error;
    }
}

