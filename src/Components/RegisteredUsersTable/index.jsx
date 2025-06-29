import { useContext, useState } from "react";
import styles from "./index.module.css";
import { UserContext } from "../../features/users/UserContext";
import VehicleDetailModal from "../VehicleDetailModal";
import UserDetailModal from "../UserDetailModal";

const RegisteredUsersTable = () => {
    const { users, loading, error } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);

    if (loading) return <p>Cargando vehículos...</p>;
    if (error) return <p>Error al cargar los vehículos: {error.message}</p>;
    if (!users.length) return <p>No hay vehículos registrados.</p>;

    const handleVerDetalles = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <section className={styles.table__container}>
                <div className={`table-responsive`}>
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
                            {users.map((user, index) => (
                                <tr key={user.idUsuario} className={styles.row}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user?.idUsuario ?? " "}</td>
                                    <td>{user?.nombre ?? " "}</td>
                                    <td>{user?.correo ?? " "}</td>
                                    <td>{user?.telefono ?? " "}</td>
                                    <td>{user?.estadoVerificacion ? user.estadoVerificacion.toLowerCase() : "inactivo"}</td>

                                    <td>
                                        <button
                                            className={styles.view__button}
                                            onClick={() => handleVerDetalles(user)}
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
            <UserDetailModal user={selectedUser} />
        </>
    );
};

export default RegisteredUsersTable;
