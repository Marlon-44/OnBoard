import React, { useState, useContext } from "react";
import ReservaContext from "./ReservaContext";

export const ReservaProvider = ({ children }) => {
    const [reservas, setReservas] = useState([]);

    const agregarReserva = (nuevaReserva) => {
        setReservas((prev) => [...prev, nuevaReserva]);
    };

    const obtenerReservas = () => reservas;

    return (
        <ReservaContext.Provider value={{ reservas, agregarReserva, obtenerReservas }}>
            {children}
        </ReservaContext.Provider>
    );
};

export const useReserva = () => useContext(ReservaContext);
