import { useContext } from "react";
import styles from "./index.module.css"
import { UserRequestContext } from "../../features/UserRequests/UserRequestContext";
const UserRequestTable = () => {
    const { requestedUsers, loadingRequests, errorRequests } = useContext(UserRequestContext);

    if (loadingRequests) return <p>Cargando vehículos pendientes...</p>;
    if (errorRequests) return <p>Error al cargar los vehículos: {errorRequests.message}</p>;
    if (!requestedUsers.length) return <p>No hay vehículos pendientes de verificación.</p>;

    return (
        <section className={styles.table__container}>
            <div className="table-responsive">
                <table className={`table table-borderless ${styles.table}`}>
                    <thead className={styles.th}>
                        <tr>
                            <th></th>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedUsers.map((user, index) => (
                            <tr key={user.idUsuario}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.idUsuario}</td>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>{user.telefono}</td>
                                <td>{user.estadoVerificacion.toLowerCase()}</td>
                                <td className={`${styles.actions} `}>
                                    <button className={styles.view__button}>
                                        <img src="/assets/eye__icon.png" alt="" />
                                    </button>
                                    <button className={styles.x__button}>
                                        <img src="/assets/x__icon__white.svg" alt="" />
                                    </button>
                                    <button className={styles.check__button}>
                                        <img src="/assets/check__icon__white.svg" alt="" />
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

export default UserRequestTable;
