import { useContext, useState } from "react";
import { VehicleRequestContext } from "../../features/vehicleRequests/VehicleRequestContext";

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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { actualizarEstadoVehiculo } from "../../api/vehicles";
import VehicleDetailModal from "../VehicleDetailModal";
import ConfirmationModal from "../ConfirmationModal";

const columns = [

    { id: "placa", label: "Placa", minWidth: 70 },
    { id: "marca", label: "Vehiculo", minWidth: 80 },
    { id: "tipo", label: "Tipo", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 100 },
    { id: "acciones", label: "Acciones", minWidth: 100 },
];

const VehicleRequestTable = () => {
    const { requestedVehicles, setRequestedVehicles, loadingRequests, errorRequests } = useContext(VehicleRequestContext);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehiculoAActualizar, setVehiculoAActualizar] = useState(null);
    const [accion, setAccion] = useState("");
    const [mensajeExito, setMensajeExito] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if (loadingRequests) return <p>Cargando vehículos pendientes...</p>;
    if (errorRequests) return <p>Error al cargar los vehículos: {errorRequests.message}</p>;
    if (!requestedVehicles.length) return <p>No hay vehículos pendientes de verificación.</p>;

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleActualizarEstado = async (placa, nuevoEstado) => {
        const estadoMap = {
            aprobado: "ACTIVA",
            rechazado: "RECHAZADA",
        };

        try {
            await actualizarEstadoVehiculo(placa, estadoMap[nuevoEstado]);


            const nuevosPendientes = requestedVehicles.filter((v) => v.placa !== placa);
            setRequestedVehicles(nuevosPendientes);

            setMensajeExito(`Vehículo ${nuevoEstado === "aprobado" ? "aprobado" : "rechazado"} con éxito`);
            setTimeout(() => setMensajeExito(""), 4000);

            setVehiculoAActualizar(null);
            setAccion("");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado del vehículo");
        }
    };

    return (
        <>
            {mensajeExito && (
                <Stack sx={{ width: "100%", mb: 2 }}>
                    <Alert severity="success">{mensajeExito}</Alert>
                </Stack>
            )}

            <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "1rem" }}>
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
                            {requestedVehicles
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((vehiculo) => (
                                    <TableRow hover key={vehiculo.placa}>
                                        <TableCell>{vehiculo.placa}</TableCell>
                                        <TableCell>{`${vehiculo.marca} ${vehiculo.modelo}`}</TableCell>
                                        <TableCell>{vehiculo.tipoVehiculo}</TableCell>
                                        <TableCell>{vehiculo.estadoOferta.toLowerCase()}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                style={{ background: "#6100bd", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white", marginLeft: "0.2rem" }}
                                                onClick={() => setSelectedVehicle(vehiculo)}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{ background: "red", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white", marginLeft: "0.2rem" }}
                                                onClick={() => {
                                                    setVehiculoAActualizar(vehiculo);
                                                    setAccion("RECHAZADO");
                                                }}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{ background: "green", border: "none", padding: "0.2rem 0.4rem", borderRadius: "5px", color: "white", marginLeft: "0.2rem" }}
                                                onClick={() => {
                                                    setVehiculoAActualizar(vehiculo);
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
                    count={requestedVehicles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <VehicleDetailModal
                vehiculo={selectedVehicle}
                onActualizarEstado={handleActualizarEstado}
                onCerrar={() => setSelectedVehicle(null)}
            />

            {vehiculoAActualizar && (
                <ConfirmationModal
                    titulo={`¿Confirmar ${accion === "APROBADO" ? "aprobación" : "rechazo"}?`}
                    mensaje={`¿Estás seguro de que deseas cambiar a ${accion} el vehículo ${vehiculoAActualizar.placa}?`}
                    onConfirmar={() =>
                        handleActualizarEstado(vehiculoAActualizar.placa, accion)
                    }
                    onCerrar={() => {
                        setVehiculoAActualizar(null);
                        setAccion("");
                    }}
                />
            )}
        </>
    );
};



export default VehicleRequestTable;
