// src/api/login.js
import axios from 'axios';

export const loginUsuario = async ({ correo, password }) => {
    const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        correo,
        password
    });
    return response.data;
};
