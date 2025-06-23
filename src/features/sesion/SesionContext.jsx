// src/features/sesion/SesionContext.jsx
import { createContext, useState, useEffect } from "react";
import {
    obtenerSesion,
    guardarSesion as guardarSesionLS,
    cerrarSesion as cerrarSesionLS,
} from "../../utils/sesion";

const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const sesionGuardada = obtenerSesion();
        if (sesionGuardada) {
            setUsuario(sesionGuardada);
        }
    }, []);

    const guardarSesion = (data) => {
        guardarSesionLS(data);  // Guardamos en localStorage
        setUsuario(data);       // Y actualizamos el estado del contexto
    };

    const cerrarSesion = () => {
        cerrarSesionLS();       // Limpiamos del localStorage
        setUsuario(null);       // Limpiamos del estado global
    };

    return (
        <SesionContext.Provider value={{ usuario, guardarSesion, cerrarSesion }}>
            {children}
        </SesionContext.Provider>
    );
};

export default SesionContext;
