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
import { getReservasByPropietario } from "../../api/reserva"; // Asegúrate que el path es correcto
import SesionContext from "../../features/sesion/SesionContext";

const columns = [
    { id: "idReserva", label: "ID Reserva", minWidth: 100 },
    { id: "isVehiculo", label: "Vehículo", minWidth: 150 },
    { id: "isCliente", label: "Cliente", minWidth: 150 },
    { id: "fechaInicio", label: "Inicio", minWidth: 120 },
    { id: "fechaFin", label: "Fin", minWidth: 120 },
    { id: "estado", label: "Estado", minWidth: 130 },
];

export default function AllReservasIOTable() {
    const { usuario } = useContext(SesionContext);
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formatFecha = (fecha) =>
        new Date(fecha).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await getReservasByPropietario(usuario.idUsuario);
                setReservas(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchReservas();
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

    if (error) return <p>Error al cargar las reservas: {error.message}</p>;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de reservas">
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
                        {reservas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((reserva) => (
                                <TableRow hover key={reserva.idReserva}>
                                    <TableCell>{reserva.idReserva}</TableCell>
                                    <TableCell>{reserva.idVehiculo}</TableCell>
                                    <TableCell>{reserva.idCliente}</TableCell>
                                    <TableCell>{formatFecha(reserva.fechaInicio)}</TableCell>
                                    <TableCell>{formatFecha(reserva.fechaFin)}</TableCell>
                                    <TableCell>{reserva.estadoReserva}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => alert("PROBANDO BOTON VER")}
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
                count={reservas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
