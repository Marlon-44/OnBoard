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
import { getAllAlquileres } from "../../api/alquiler"; // Asegúrate que esta ruta es correcta

const AlquileresColumns = [
    { id: "idAlquiler", label: "ID Alquiler", minWidth: 100 },
    { id: "idReserva", label: "ID Reserva", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 100 },
    { id: "fechaNovedad", label: "Fecha Novedad", minWidth: 180 },
    { id: "precioTotal", label: "Precio Total", minWidth: 100 },
];

export default function AllAlquileresTable() {
    const [alquileres, setAlquileres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        const fetchAlquileres = async () => {
            try {
                const data = await getAllAlquileres();
                setAlquileres(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlquileres();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <p>Cargando alquileres...</p>;
    if (error) return <p>Error al cargar los alquileres: {error.message}</p>;
    

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh",minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de alquileres">
                    <TableHead>
                        <TableRow>
                            {AlquileresColumns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align || "left"}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alquileres
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((alquiler) => (
                                <TableRow hover key={alquiler.idAlquiler}>
                                    {AlquileresColumns.map((column) => {
                                        const value = alquiler[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                {column.id === "fechaNovedad"
                                                    ? formatFecha(value)
                                                    : column.id === "precioTotal"
                                                    ? `$ ${Number(value).toLocaleString("es-CO")}`
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
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
