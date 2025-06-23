export const guardarSesion = (usuario) => {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
};

export const obtenerSesion = () => {
    const usuario = localStorage.getItem("usuarioLogueado");
    return usuario ? JSON.parse(usuario) : null;
};

export const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
};
