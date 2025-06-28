import { useContext, useState } from "react";
import { VehicleContext } from "../../features/vehicles/VehicleContext";
import styles from "./index.module.css";
import VehicleDetailModal from "../VehicleDetailModal";

const TablaVehiculosRegistrados = () => {
    const { vehicles, loading, error } = useContext(VehicleContext);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

    if (loading) return <p>Cargando vehículos...</p>;
    if (error) return <p>Error al cargar los vehículos: {error.message}</p>;
    if (!vehicles.length) return <p>No hay vehículos registrados.</p>;

    const handleVerDetalles = (vehiculo) => {
        setVehiculoSeleccionado(vehiculo);
    };

    return (
        <>
            <section className={styles.table__container}>
                <div className={`table-responsive`}>
                    <table className={`table table-borderless ${styles.table}`}>
                        <thead className={styles.th}>
                            <tr>
                                <th>#</th>
                                <th>Placa</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Tipo</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehiculo, index) => (
                                <tr key={vehiculo.placa} className={styles.row}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.marca}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td>{vehiculo.anio}</td>
                                    <td>{vehiculo.tipoVehiculo}</td>
                                    <td>${vehiculo.precioPorDia.toLocaleString()}</td>
                                    <td>{vehiculo.estadoOferta.toLowerCase()}</td>
                                    <td>
                                        <button
                                            className={styles.view__button}
                                            onClick={() => handleVerDetalles(vehiculo)}
                                        >
                                            <img src="/assets/eye__icon.png" alt="Ver" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modal de detalles */}
            <VehicleDetailModal vehiculo={vehiculoSeleccionado} />
        </>
    );
};

export default TablaVehiculosRegistrados;
