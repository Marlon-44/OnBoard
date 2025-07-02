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
    Box,
    CircularProgress
} from "@mui/material";


import SesionContext from "../../features/sesion/SesionContext";
import { getVehiclesByOwner } from "../../api/vehicles";

const columns = [
    { id: "placa", label: "Placa", minWidth: 100 },
    { id: "marca", label: "Marca", minWidth: 100 },
    { id: "modelo", label: "Modelo", minWidth: 100 },
    { id: "tipoVehiculo", label: "Tipo", minWidth: 100 },
];

export default function MisVehiculosIOTable() {
    const { usuario } = useContext(SesionContext);
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchVehiculos = async () => {
            try {
                const data = await getVehiclesByOwner(usuario.idUsuario);
                setVehiculos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchVehiculos();
    }, [usuario]);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) return <p>Error al cargar los vehículos: {error.message}</p>;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de vehículos">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
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
                        {vehiculos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((vehiculo) => (
                                <TableRow hover key={vehiculo.placa}>
                                    {columns.map((column) => {
                                        const value = vehiculo[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align || "left"}>
                                                {value}
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
                count={vehiculos.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
