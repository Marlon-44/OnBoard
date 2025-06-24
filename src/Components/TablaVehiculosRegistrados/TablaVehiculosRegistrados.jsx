// src/Components/TablaVehiculosRegistrados.jsx
import { useContext } from "react";
import { VehicleContext } from "../../features/vehicles/VehicleContext";
import styles from "./index.module.css"

const TablaVehiculosRegistrados = () => {
    const { vehicles, loading, error } = useContext(VehicleContext);

    if (loading) return <p>Cargando vehículos...</p>;
    if (error) return <p>Error al cargar los vehículos: {error.message}</p>;
    if (!vehicles.length) return <p>No hay vehículos registrados.</p>;

    return (
        <section className={styles.table__container}>
            <div className={`table-responsive `} >
                <table className={`table table-borderless ${styles.table}`}>
                    <thead className={styles.th}>
                        <tr>
                            <th>{""}</th>
                            <th>Placa</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>{""}</th> 
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
                                    <button className={styles.view__button}>
                                        <img src="/assets/eye__icon.png" alt="" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

    );
};

export default TablaVehiculosRegistrados;
