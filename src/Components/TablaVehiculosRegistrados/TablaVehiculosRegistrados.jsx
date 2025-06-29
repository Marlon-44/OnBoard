import { useContext, useState } from "react";
import { VehicleContext } from "../../features/vehicles/VehicleContext";
import VehicleDetailModal from "../VehicleDetailModal";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styles from "./index.module.css"

const RegisteredVehiclesColumns = [
    { id: "placa", label: "Placa", minWidth: 100 },
    { id: "marca", label: "Marca", minWidth: 100 },
    { id: "modelo", label: "Modelo", minWidth: 100 },
    { id: "tipoVehiculo", label: "Tipo", minWidth: 100 },
    {
        id: "estadoOferta",
        label: "Estado",
        minWidth: 100,
        format: (value) => value?.toLowerCase() ?? "pendiente",
    },
];

export default function TablaVehiculosRegistrados() {
    const { vehicles, loading, error } = useContext(VehicleContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <p>Cargando vehículos...</p>;
    if (error) return <p>Error al cargar los vehículos: {error.message}</p>;
    if (!vehicles.length) return <p>No hay vehículos registrados.</p>;

    return (
        <>
            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }} style={{borderRadius:"1rem"}}>
                <TableContainer sx={{ maxHeight: "48vh" }}>
                    <Table stickyHeader aria-label="vehiculos registrados">
                        <TableHead>
                            <TableRow>
                                {RegisteredVehiclesColumns.map((column) => (
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
                            {vehicles
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((vehiculo) => {
                                    return (
                                        <TableRow hover key={vehiculo.placa}>
                                            {RegisteredVehiclesColumns.map((column) => {
                                                const value = vehiculo[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align || "left"}>
                                                        {column.format && typeof value !== "undefined"
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell>
                                                <button
                                                    onClick={() => setVehiculoSeleccionado(vehiculo)}
                                                    style={{ background: "#6100bd", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", color: "white" }}
                                                >
                                                    Ver
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 50]}
                    component="div"
                    count={vehicles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal de detalles */}
            <VehicleDetailModal vehiculo={vehiculoSeleccionado} />
        </>
    );
}
