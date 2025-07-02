import { useContext, useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    CircularProgress,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";
import SesionContext from "../../features/sesion/SesionContext";
import { getAlquileresActivosByCliente } from "../../api/alquiler";

const AlquileresActivosColumns = [
    { id: "idAlquiler", label: "ID Alquiler", minWidth: 100 },
    { id: "idReserva", label: "ID Reserva", minWidth: 150 },
    { id: "fechaInicio", label: "Inicio", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 130 },
];

export default function AlquileresActivosUCTable() {
    const { usuario } = useContext(SesionContext);
    const [alquileres, setAlquileres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const formatFecha = (fecha) =>
        new Date(fecha).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    useEffect(() => {
        const fetchAlquileres = async () => {
            try {
                const data = await getAlquileresActivosByCliente(usuario.idUsuario);
                setAlquileres(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchAlquileres();
    }, [usuario]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <p>Error al cargar los alquileres: {error.message}</p>;

    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
                <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                    <Table stickyHeader aria-label="tabla de alquileres activos">
                        <TableHead>
                            <TableRow>
                                {AlquileresActivosColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alquileres
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((alquiler) => (
                                    <TableRow hover key={alquiler.idAlquiler}>
                                        <TableCell>{alquiler.idAlquiler}</TableCell>
                                        <TableCell>
                                            {alquiler.isReserva}
                                        </TableCell>
                                        <TableCell>{formatFecha(alquiler.fechaInicio)}</TableCell>
                                        <TableCell>{alquiler.estado}</TableCell>
                                        <TableCell>
                                            <button
                                                onClick={() => alert("Ver detalle (opcional)")}
                                                style={{
                                                    background: "#0d6efd",
                                                    border: "none",
                                                    padding: "0.4rem 0.8rem",
                                                    borderRadius: "5px",
                                                    color: "white",
                                                }}
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
                    count={alquileres.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}
