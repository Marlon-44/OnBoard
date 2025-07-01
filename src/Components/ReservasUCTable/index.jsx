import { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { getReservasByUser } from "../../api/reserva";
import AllReservasModal from "../AllReservasModal";

// 👇 columnas visibles
const ReservasColumns = [
    { id: "idVehiculo", label: "Vehículo", minWidth: 100 },
    { id: "fechaInicio", label: "Fecha Inicio", minWidth: 100 },
    { id: "fechaFin", label: "Fecha Fin", minWidth: 100 },
    { id: "estadoReserva", label: "Estado", minWidth: 100 },
];

export default function ReservasUCTable({ idUsuario }) {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const data = await getReservasByUser(idUsuario);
                setReservas(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (idUsuario) {
            fetchReservas();
        }
    }, [idUsuario]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <p>Cargando tus reservas...</p>;
    if (error) return <p>Error al cargar tus reservas: {error.message}</p>;
    if (!reservas.length) return <p>No tienes reservas registradas.</p>;

    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }} style={{ borderRadius: "1rem" }}>
                <TableContainer sx={{ maxHeight: "48vh" }}>
                    <Table stickyHeader aria-label="tabla de reservas del usuario">
                        <TableHead>
                            <TableRow>
                                {ReservasColumns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align || "left"}
                                        style={{ minWidth: column.minWidth }}
                                    >
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
                                        {ReservasColumns.map((column) => {
                                            const value = reserva[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {["fechaInicio", "fechaFin"].includes(column.id)
                                                        ? formatFecha(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <button
                                                onClick={() => setReservaSeleccionada(reserva)}
                                                style={{
                                                    background: "#6100bd",
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
            <AllReservasModal
                reserva={reservaSeleccionada}
                onCerrar={() => setReservaSeleccionada(null)}
            />
        </>
    );
}
