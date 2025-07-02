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
} from "@mui/material";
import SesionContext from "../../features/sesion/SesionContext";
import { obtenerAlquileresConfirmadosPorPropietario } from "../../api/alquiler"; // Asegúrate que la ruta sea correcta

const AlquileresActivosColumns = [
    { id: "idAlquiler", label: "ID Alquiler", minWidth: 100 },
    { id: "vehiculo", label: "Vehículo", minWidth: 150 },
    { id: "cliente", label: "Cliente", minWidth: 150 },
    { id: "fechaInicio", label: "Inicio", minWidth: 100 },
    { id: "fechaFin", label: "Fin", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 130 },
];

export default function AlquileresActivosIOTable() {
    const { usuario } = useContext(SesionContext);
    const [alquileres, setAlquileres] = useState([]);
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
        const fetchAlquileres = async () => {
            try {
                const data = await obtenerAlquileresConfirmadosPorPropietario(usuario.idUsuario);
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

    if (loading) return <p>Cargando alquileres confirmados...</p>;
    if (error) return <p>Error al cargar los alquileres: {error.message}</p>;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de alquileres confirmados">
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
                                    <TableCell>{alquiler.vehiculo?.marca} {alquiler.vehiculo?.modelo}</TableCell>
                                    <TableCell>{alquiler.cliente?.nombre}</TableCell>
                                    <TableCell>{formatFecha(alquiler.fechaInicio)}</TableCell>
                                    <TableCell>{formatFecha(alquiler.fechaFin)}</TableCell>
                                    <TableCell>{alquiler.estado}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => window.location.href = `/detalle-alquiler/${alquiler.idAlquiler}`}
                                            style={{
                                                background: "#0d6efd",
                                                border: "none",
                                                padding: "0.4rem 0.8rem",
                                                borderRadius: "5px",
                                                color: "white",
                                            }}
                                        >
                                            Ver Detalle
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
