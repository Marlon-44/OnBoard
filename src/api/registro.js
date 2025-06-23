// src/api/registro.js
import axios from 'axios';

export const registrarUsuario = async (data) => {


    // Si accidentalmente viene como "rol", cámbialo a "idRol"
    if (data.usuario?.rol && !data.usuario?.idRol) {
        data.usuario.idRol = data.usuario.rol;
        delete data.usuario.rol;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/usuarios/registro', data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("❌ Error al registrar:", error);
        throw error.response?.data || error;
    }
};