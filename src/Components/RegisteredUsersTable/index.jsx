import { useContext, useState } from "react";
import { UserContext } from "../../features/users/UserContext";
import UserDetailModal from "../UserDetailModal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";


const columns = [
    { id: "numero", label: "", minWidth: 40 },
    { id: "idUsuario", label: "Cédula", minWidth: 100 },
    { id: "nombre", label: "Nombre", minWidth: 170 },
    { id: "telefono", label: "Teléfono", minWidth: 120 },
    { id: "estado", label: "Estado", minWidth: 100 },
    { id: "acciones", label: "Acciones", minWidth: 50 },
];

const RegisteredUsersTable = () => {
    const { users, loading, error } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error al cargar los usuarios: {error.message}</p>;
    if (!users.length) return <p>No hay usuarios registrados.</p>;

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleVerDetalles = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden" , marginTop: "1rem"}} style={{borderRadius:"1rem"}}>
                <TableContainer sx={{ maxHeight: "48vh"}}>
                    <Table stickyHeader aria-label="tabla usuarios registrados">
                        <TableHead>
                            <TableRow>
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.id}
                                        align={col.align || "left"}
                                        style={{ minWidth: col.minWidth }}
                                    >
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => (
                                    <TableRow hover tabIndex={-1} key={user.idUsuario}>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{user?.idUsuario ?? "—"}</TableCell>
                                        <TableCell>{user?.nombre ?? "—"}</TableCell>
                                        <TableCell>{user?.telefono ?? "—"}</TableCell>
                                        <TableCell>
                                            {user?.estadoVerificacion
                                                ? user.estadoVerificacion.toLowerCase()
                                                : "inactivo"}
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                style={{ background: "#6100bd", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", color: "white" }}
                                                onClick={() => handleVerDetalles(user)}
                                            >
                                                Ver
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal */}
            <UserDetailModal user={selectedUser} onCerrar={()=>setSelectedUser(null)}/>
        </>
    );
};

export default RegisteredUsersTable;
