// src/features/OfertasProvider.jsx
import { useEffect, useState } from "react";
import OfertasContext from "./OfertasContext";
import { getOfertas } from "../../api/ofertas";

const OfertasProvider = ({ children }) => {
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtrosAplicados, setFiltrosAplicados] = useState(null);

    // 🔹 1. Cargar todas las ofertas al inicio
    useEffect(() => {
        const cargarOfertas = async () => {
            setLoading(true);
            const data = await getOfertas();
            setOfertas(data);
            setLoading(false);
        };
        cargarOfertas();
    }, []);

    // 🔹 2. Actualizar ofertas manualmente desde filtros o búsqueda
    const actualizarOfertas = (nuevasOfertas, filtros = null) => {
        setOfertas(nuevasOfertas);
        setFiltrosAplicados(filtros);
    };

    return (
        <OfertasContext.Provider value={{
            ofertas,
            loading,
            actualizarOfertas,
            filtrosAplicados
        }}>
            {children}
        </OfertasContext.Provider>
    );
};

export default OfertasProvider;
