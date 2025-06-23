// src/utils/sesion.js
export const guardarSesion = (usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
};

export const obtenerSesion = () => {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
};

export const cerrarSesion = () => {
    localStorage.removeItem("usuario");
};
