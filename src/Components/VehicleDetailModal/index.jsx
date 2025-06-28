// src/Components/ModalDetalleVehiculo.jsx
import { useEffect } from "react";
import styles from "./index.module.css"
const VehicleDetailModal = ({ vehiculo, id = "vehiculoModal" }) => {
    useEffect(() => {
        // Reinicializa el modal cada vez que cambia el vehículo
        if (vehiculo) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [vehiculo, id]);

    if (!vehiculo) return null;

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Vehículo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className={`modal-body ${styles.modal__body}`}>
                        <img src={vehiculo.fotosUrls[0]} alt="" />
                        <ul className={styles.vehicle__datalist}>
                            <h2>{`${vehiculo.marca} ${vehiculo.modelo} | ${vehiculo.anio}`}</h2>
                            <li><strong>Placa:</strong> {vehiculo.placa}</li>
                            <li><strong>Tipo de vehículo:</strong> {vehiculo.tipoVehiculo}</li>
                            <li><strong>Tipo de terreno:</strong> {vehiculo.tipoTerreno}</li>
                            <li><strong>Marca:</strong> {vehiculo.marca}</li>
                            <li><strong>Modelo:</strong> {vehiculo.modelo}</li>
                            <li><strong>Año:</strong> {vehiculo.anio}</li>
                            <li><strong>Capacidad de pasajeros:</strong> {vehiculo.capacidadPasajeros}</li>


                        </ul>

                    </div>
                    <section className={styles.vehicle__details}>
                        <table className={` ${styles.table}`}>
                            <thead className={styles.th}>
                                <tr className={styles.row}>
                                    <th scope="col">Atributo</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={styles.row}>
                                    <td>SOAT</td>
                                    <td className={styles.short__text}>{vehiculo.soat}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Tecnomecánica</td>
                                    <td>{vehiculo.tecnomecanica}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Antecedentes</td>
                                    <td>{vehiculo.antecedentes}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Transmisión</td>
                                    <td>{vehiculo.tipoTransmision}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Combustible</td>
                                    <td>{vehiculo.combustible}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Kilometraje</td>
                                    <td>{vehiculo.kilometraje.toLocaleString()} km</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Descripción</td>
                                    <td>{vehiculo.descripcion}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>ID del propietario</td>
                                    <td>{vehiculo.idPropietario}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Fecha de registro</td>
                                    <td>{new Date(vehiculo.fechaRegistro).toLocaleDateString()}</td>
                                </tr>
                                <tr className={styles.row}> 
                                    <td>Cantidad de alquileres</td>
                                    <td>{vehiculo.cantidadAlquiler}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Estado de la oferta</td>
                                    <td>{vehiculo.estadoOferta}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Precio por día</td>
                                    <td>${vehiculo.precioPorDia.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                        


                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-danger">
                            Rechazar
                        </button>
                        <button type="button" className="btn btn-success">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailModal;
