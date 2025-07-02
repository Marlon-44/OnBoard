import { useContext, useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import SesionContext from "../../features/sesion/SesionContext";
import { getAllAlquileresByCliente } from "../../api/alquiler";

const columns = [
    { id: "idAlquiler", label: "ID Alquiler", minWidth: 100 },
    { id: "idReserva", label: "ID Reserva", minWidth: 150 },
    { id: "fechaInicio", label: "Fecha Novedad", minWidth: 120 },
    { id: "estado", label: "Estado", minWidth: 130 },
];

export default function AllAlquileresUCTable() {
    const { usuario } = useContext(SesionContext);
    const [alquileres, setAlquileres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllAlquileresByCliente(usuario.idUsuario);
                setAlquileres(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchData();
    }, [usuario]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de alquileres cliente">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
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
                                    <TableCell>{alquiler.idReserva}</TableCell>
                                    <TableCell>{formatFecha(alquiler.fechaNovedad)}</TableCell>
                                    <TableCell>{alquiler.estado}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() =>
                                                window.location.href = `/detalle-alquiler/${alquiler.idAlquiler}`
                                            }
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
    );
}
