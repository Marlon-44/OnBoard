import { useContext, useState } from "react";
import styles from "./index.module.css"
import { UserRequestContext } from "../../features/userRequests/UserRequestContext";
import UserDetailModal from "../UserDetailModal";
import { actualizarEstadoUsuario } from "../../api/user";
import ConfirmationModal from "../ConfirmationModal";
import { UserContext } from "../../features/users/UserContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const UserRequestTable = () => {

    const { requestedUsers, loadingRequests, errorRequests, setRequestedUsers } = useContext(UserRequestContext);
    const { users, setUsers } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [usuarioAActualizar, setUsuarioAActualizar] = useState(null);
    const [accion, setAccion] = useState(""); // "aprobado" o "rechazado"
    const [mensajeExito, setMensajeExito] = useState("");


    if (loadingRequests) return <p>Cargando vehículos pendientes...</p>;
    if (errorRequests) return <p>Error al cargar los vehículos: {errorRequests.message}</p>;
    if (!requestedUsers.length) return <p>No hay vehículos pendientes de verificación.</p>;

    const handleVerDetalles = (user) => {
        setSelectedUser(user)
    }
    const handleActualizarEstado = async (userId, nuevoEstado) => {
        try {
            await actualizarEstadoUsuario(userId, nuevoEstado);

            // 🔄 Actualizar listas
            const nuevosPendientes = requestedUsers.filter((u) => u.idUsuario !== userId);
            setRequestedUsers(nuevosPendientes);

            const usuarioActualizado = requestedUsers.find(u => u.idUsuario === userId);
            if (usuarioActualizado) {
                const actualizado = { ...usuarioActualizado, estadoVerificacion: nuevoEstado };

                const existe = users.some(u => u.idUsuario === userId);
                const nuevosRegistrados = existe
                    ? users.map(u => u.idUsuario === userId ? actualizado : u)
                    : [...users, actualizado];

                setUsers(nuevosRegistrados);
            }

            // ✅ Mostrar mensaje de éxito
            setMensajeExito(`Usuario ${nuevoEstado === "aprobado" ? "aprobado" : "rechazado"} con éxito`);

            // 🕒 Ocultar mensaje después de 4 segundos
            setTimeout(() => setMensajeExito(""), 4000);

            // 🧼 Limpiar modal
            setUsuarioAActualizar(null);
            setAccion("");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado");
        }
    };



    return (

        <section className={styles.table__container}>
            {mensajeExito && (
                <Stack sx={{ width: '100%', marginBottom: 2 }}>
                    <Alert severity="success">{mensajeExito}</Alert>
                </Stack>
            )}

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
                            <tr key={user.idUsuario} className={styles.row}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.idUsuario}</td>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>{user.telefono}</td>
                                <td>{user.estadoVerificacion.toLowerCase()}</td>
                                <td className={`${styles.actions} `}>
                                    <button className={styles.view__button}
                                        onClick={() => handleVerDetalles(user)}>
                                        <img src="/assets/eye__icon.png" alt="" />
                                    </button>
                                    <button className={styles.x__button}
                                        onClick={() => {
                                            setUsuarioAActualizar(user);
                                            setAccion("rechazado");
                                        }}
                                    >
                                        <img src="/assets/x__icon__white.svg" alt="Rechazar" />
                                    </button>

                                    <button className={styles.check__button}
                                        onClick={() => {
                                            setUsuarioAActualizar(user);
                                            setAccion("aprobado");
                                        }}
                                    >
                                        <img src="/assets/check__icon__white.svg" alt="Aprobar" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal de detalles */}
            <UserDetailModal user={selectedUser} />
            {usuarioAActualizar && (
                <ConfirmationModal
                    titulo={`¿Confirmar ${accion === "aprobado" ? "aprobación" : "rechazo"}?`}
                    mensaje={`¿Estás seguro de que deseas ${accion} al usuario ${usuarioAActualizar.nombre}?`}
                    onConfirmar={async () => {
                        await handleActualizarEstado(usuarioAActualizar.idUsuario, accion);
                    }}
                    onCerrar={() => {
                        setUsuarioAActualizar(null);
                        setAccion("");
                    }}
                />

            )}

        </section>
    );
};

export default UserRequestTable;
