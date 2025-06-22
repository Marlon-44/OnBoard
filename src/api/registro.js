// src/api/registro.js
import axios from 'axios';

export const registrarUsuario = async (data) => {
    try {
        const response = await axios.post('http://localhost:8080/api/usuarios/registro', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
