// src/features/sesion/SesionContext.jsx
import { createContext, useState, useEffect, useRef } from "react";
import {
    obtenerSesion,
    guardarSesion as guardarSesionLS,
    cerrarSesion as cerrarSesionLS,
} from "../../utils/sesion";

const SesionContext = createContext();

export const SesionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const timeoutRef = useRef(null);

    const TIEMPO_INACTIVIDAD = 15 * 60 * 1000; // 15 minutos

    useEffect(() => {
        const resetTimer = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                cerrarSesion(); // Cierra la sesión si hay inactividad
            }, TIEMPO_INACTIVIDAD);
        };

        // Eventos que reinician el contador de inactividad
        const eventos = ["mousemove", "keydown", "click"];

        eventos.forEach((evento) => {
            window.addEventListener(evento, resetTimer);
        });

        resetTimer(); // Inicia el primer temporizador

        return () => {
            eventos.forEach((evento) => {
                window.removeEventListener(evento, resetTimer);
            });
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [usuario]);
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
