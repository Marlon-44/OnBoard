// src/Components/ModalDetalleVehiculo.jsx
import { useEffect } from "react";
import styles from "./index.module.css"
const UserDetailModal = ({ user, id = "userModal" }) => {
    useEffect(() => {
        // Reinicializa el modal cada vez que cambia el vehículo
        if (user) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [user, id]);

    if (!user) return null;

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Usuario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div className={`modal-body ${styles.modal__body}`}>
                        <img src={user.fotoPerfilUrl} alt="" />
                        <ul className={styles.vehicle__datalist}>
                            <h2>{user.nombre}</h2>
                            <li><strong>ID Usuario:</strong> {user.idUsuario}</li>
                            <li><strong>Tipo de identificación:</strong> {user.tipoIdentificacion}</li>
                            <li><strong>Correo:</strong> {user.correo}</li>
                            <li><strong>Teléfono:</strong> {user.telefono}</li>
                            <li><strong>Dirección:</strong> {user.direccion}</li>
                            <li><strong>Fecha de registro:</strong> {new Date(user.fechaRegistro).toLocaleDateString()}</li>
                            <li><strong>Cuenta bancaria:</strong> {user.cuentaBancaria}</li>
                            <li><strong>Rol:</strong> {user.idRol}</li>
                            <li><strong>Estado de verificación:</strong> {user.estadoVerificacion}</li>
                        </ul>


                    </div>
                    <section className={styles.vehicle__details}>
                        <table className={`${styles.table}`}>
                            <thead className={styles.th}>
                                <tr className={styles.row}>
                                    <th scope="col">Atributo</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={styles.row}>
                                    <td>ID Usuario</td>
                                    <td>{user.idUsuario}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Tipo de identificación</td>
                                    <td>{user.tipoIdentificacion}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Nombre</td>
                                    <td>{user.nombre}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Correo</td>
                                    <td className={styles.short__text}>{user.correo}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Teléfono</td>
                                    <td>{user.telefono}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Dirección</td>
                                    <td>{user.direccion}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Fecha de registro</td>
                                    <td>{new Date(user.fechaRegistro).toLocaleDateString()}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Cuenta bancaria</td>
                                    <td className={styles.short__text}>{user.cuentaBancaria}</td>
                                </tr>
                                <tr className={styles.row}>
                                    <td>Rol</td>
                                    <td>{user.idRol}</td> {/* Puedes mapear el ID a nombre si lo deseas */}
                                </tr>
                                <tr className={styles.row}>
                                    <td>Estado de verificación</td>
                                    <td>{user.estadoVerificacion}</td>
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

export default UserDetailModal;
