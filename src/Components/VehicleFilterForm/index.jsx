import OfertasContext from "../../features/ofertas/OfertasContext";
import styles from "./index.module.css";
import { useState, useContext } from "react";// ✅ Importar el contexto

const VEHICULOS_PERMITIDOS = [
    "Car", "Motorcycle", "Bus", "Boat", "Truck",
    "SUV", "Van", "Pickup", "Bicycle", "ATV", "Jet Ski"
];

const TIPOS_TRANSMISION_PERMITIDOS = [
    "Automatic", "Manual", "Semi-automatic"
];

const TIPOS_COMBUSTIBLE_PERMITIDOS = [
    "Gasoline", "Diesel", "Electric", "Hybrid", "Natural Gas", "Hydrogen"
];

const TIPOS_TERRENO_PERMITIDOS = [
    "Urban", "Rural", "Mixed", "Highway", "Off-road"
];

const VehicleFilterForm = () => {
    const { actualizarOfertas } = useContext(OfertasContext); // ✅ Obtener función del contexto

    const [filters, setFilters] = useState({
        vehiculos: [],
        transmision: "",
        combustible: [],
        terreno: [],
        precio: [0, 100000],
        anio: [2000, 2025],
        pasajerosMin: 2,
        pasajerosMax: 50
    });

    const handleCheckbox = (type, value) => {
        setFilters(prev => {
            const updated = prev[type].includes(value)
                ? prev[type].filter(v => v !== value)
                : [...prev[type], value];
            return { ...prev, [type]: updated };
        });
    };

    const handleRadio = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    const handleRange = (type, index, value) => {
        const newRange = [...filters[type]];
        newRange[index] = Number(value);
        setFilters(prev => ({ ...prev, [type]: newRange }));
    };

    const handleInputNumber = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: Number(value) }));
    };

    const handleApply = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/vehiculos/filtrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filters)
            });

            if (!response.ok) throw new Error("Error al aplicar filtros");

            const data = await response.json();

            // ✅ Actualizar el contexto con las ofertas filtradas
            actualizarOfertas(data, filters);
        } catch (error) {
            console.error("Error al aplicar filtros:", error);
        }
    };

    return (
        <aside className={styles.filter__container}>
            <h2>Filtrar vehículos</h2>

            <section>
                <h3>Tipo de Vehículo</h3>
                <div className={styles.checkbox__group}>
                    {VEHICULOS_PERMITIDOS.map(v => (
                        <label key={v}>
                            <input
                                type="checkbox"
                                checked={filters.vehiculos.includes(v)}
                                onChange={() => handleCheckbox("vehiculos", v)}
                            />
                            {v}
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <h3>Transmisión</h3>
                <div className={styles.radio__group}>
                    {TIPOS_TRANSMISION_PERMITIDOS.map(t => (
                        <label key={t}>
                            <input
                                type="radio"
                                name="transmision"
                                checked={filters.transmision === t}
                                onChange={() => handleRadio("transmision", t)}
                            />
                            {t}
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <h3>Combustible</h3>
                <div className={styles.checkbox__group}>
                    {TIPOS_COMBUSTIBLE_PERMITIDOS.map(c => (
                        <label key={c}>
                            <input
                                type="checkbox"
                                checked={filters.combustible.includes(c)}
                                onChange={() => handleCheckbox("combustible", c)}
                            />
                            {c}
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <h3>Terreno</h3>
                <div className={styles.checkbox__group}>
                    {TIPOS_TERRENO_PERMITIDOS.map(t => (
                        <label key={t}>
                            <input
                                type="checkbox"
                                checked={filters.terreno.includes(t)}
                                onChange={() => handleCheckbox("terreno", t)}
                            />
                            {t}
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <h3>Rango de Precio</h3>
                <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.precio[0]}
                    onChange={(e) => handleRange("precio", 0, e.target.value)}
                />
                <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.precio[1]}
                    onChange={(e) => handleRange("precio", 1, e.target.value)}
                />
                <p>${filters.precio[0]} - ${filters.precio[1]}</p>
            </section>

            <section>
                <h3>Año del vehículo</h3>
                <input
                    type="range"
                    min="2000"
                    max="2025"
                    value={filters.anio[0]}
                    onChange={(e) => handleRange("anio", 0, e.target.value)}
                />
                <input
                    type="range"
                    min="2000"
                    max="2025"
                    value={filters.anio[1]}
                    onChange={(e) => handleRange("anio", 1, e.target.value)}
                />
                <p>{filters.anio[0]} - {filters.anio[1]}</p>
            </section>

            <section>
                <h3>Capacidad de Pasajeros</h3>
                <label>
                    Mínimo:
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={filters.pasajerosMin}
                        onChange={(e) => handleInputNumber("pasajerosMin", e.target.value)}
                    />
                </label>
                <label>
                    Máximo:
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={filters.pasajerosMax}
                        onChange={(e) => handleInputNumber("pasajerosMax", e.target.value)}
                    />
                </label>
            </section>

            <button onClick={handleApply} className={styles.apply__button}>
                Aplicar Filtros
            </button>
        </aside>
    );
};

export default VehicleFilterForm;
