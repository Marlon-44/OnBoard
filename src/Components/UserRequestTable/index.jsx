import { useContext, useState } from "react";
import { UserRequestContext } from "../../features/userRequests/UserRequestContext";
import { UserContext } from "../../features/users/UserContext";
import { actualizarEstadoUsuario } from "../../api/user";

import UserDetailModal from "../UserDetailModal";
import ConfirmationModal from "../ConfirmationModal";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const columns = [
    { id: "numero", label: "", minWidth: 30 },
    { id: "idUsuario", label: "Cédula", minWidth: 100 },
    { id: "nombre", label: "Nombre", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 100 },
    { id: "acciones", label: "Acciones", minWidth: 100 },
];

const UserRequestTable = () => {
    const { requestedUsers, loadingRequests, errorRequests, setRequestedUsers } =
        useContext(UserRequestContext);
    const { users, setUsers } = useContext(UserContext);

    const [selectedUser, setSelectedUser] = useState(null);
    const [usuarioAActualizar, setUsuarioAActualizar] = useState(null);
    const [accion, setAccion] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if (loadingRequests) return <p>Cargando usuarios pendientes...</p>;
    if (errorRequests) return <p>Error al cargar los usuarios: {errorRequests.message}</p>;
    if (!requestedUsers.length) return <p>No hay usuarios pendientes de verificación.</p>;

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleVerDetalles = (user) => {
        setSelectedUser(user);
    };

    const handleActualizarEstado = async (userId, nuevoEstado) => {
        try {
            await actualizarEstadoUsuario(userId, nuevoEstado);

            const nuevosPendientes = requestedUsers.filter((u) => u.idUsuario !== userId);
            setRequestedUsers(nuevosPendientes);

            const usuarioActualizado = requestedUsers.find((u) => u.idUsuario === userId);
            if (usuarioActualizado) {
                const actualizado = { ...usuarioActualizado, estadoVerificacion: nuevoEstado };
                const existe = users.some((u) => u.idUsuario === userId);
                const nuevosRegistrados = existe
                    ? users.map((u) => (u.idUsuario === userId ? actualizado : u))
                    : [...users, actualizado];
                setUsers(nuevosRegistrados);
            }

            setMensajeExito(`Usuario ${nuevoEstado === "aprobado" ? "aprobado" : "rechazado"} con éxito`);
            setTimeout(() => setMensajeExito(""), 4000);

            setUsuarioAActualizar(null);
            setAccion("");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado");
        }
    };

    return (
        <>
            {mensajeExito && (
                <Stack sx={{ width: "100%", mb: 2 }}>
                    <Alert severity="success">{mensajeExito}</Alert>
                </Stack>
            )}

            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem", borderRadius: "1rem" }}>
                <TableContainer sx={{ maxHeight: "48vh" }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {requestedUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => (
                                    <TableRow hover key={user.idUsuario}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{user.idUsuario}</TableCell>
                                        <TableCell>{user.nombre}</TableCell>
                                        <TableCell>{user.estadoVerificacion.toLowerCase()}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                style={{ background: "#6100bd", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white" }}
                                                color="primary" onClick={() => handleVerDetalles(user)}>

                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                style={{ background: "red", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white", marginLeft: "0.2rem" }}
                                                onClick={() => {
                                                    setUsuarioAActualizar(user);
                                                    setAccion("RECHAZADO");
                                                }}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                            <IconButton
                                                color="success"
                                                style={{ background: "green", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white", marginLeft: "0.2rem" }}
                                                onClick={() => {
                                                    setUsuarioAActualizar(user);
                                                    setAccion("APROBADO");
                                                }}
                                            >
                                                <CheckCircleIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={requestedUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <UserDetailModal
                user={selectedUser}
                onActualizarEstado={handleActualizarEstado}
                onCerrar={() => setSelectedUser(null)}
            />
            {usuarioAActualizar && (
                <ConfirmationModal
                    titulo={`¿Confirmar ${accion === "aprobado" ? "aprobación" : "rechazo"}?`}
                    mensaje={`¿Estás seguro de que deseas ${accion} al usuario ${usuarioAActualizar.nombre}?`}
                    onConfirmar={async () =>
                        await handleActualizarEstado(usuarioAActualizar.idUsuario, accion)
                    }
                    onCerrar={() => {
                        setUsuarioAActualizar(null);
                        setAccion("");
                    }}
                />
            )}
        </>
    );
};

export default UserRequestTable;
