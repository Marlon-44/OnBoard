import axios from 'axios';
import qs from 'qs'; // Asegúrate de instalarlo: npm install qs

export const loginUsuario = async ({ correo, password }) => {
    const response = await axios.post(
        'http://localhost:8080/api/usuarios/login',
        qs.stringify({ correo, password }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    return response.data;
};