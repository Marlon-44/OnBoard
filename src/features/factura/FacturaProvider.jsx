import React, { useState, useContext } from "react";
import FacturaContext from "./FacturaContext";

export const FacturaProvider = ({ children }) => {
    const [facturas, setFacturas] = useState([]);

    const agregarFactura = (nuevaFactura) => {
        setFacturas((prev) => [...prev, nuevaFactura]);
    };

    const obtenerFacturas = () => facturas;

    return (
        <FacturaContext.Provider value={{ facturas, agregarFactura, obtenerFacturas }}>
            {children}
        </FacturaContext.Provider>
    );
};

export const useFactura = () => useContext(FacturaContext);
