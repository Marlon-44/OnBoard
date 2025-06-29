import { useEffect } from "react";
import styles from "./index.module.css";

import {
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        wordBreak: "break-word",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const VehicleDetailModal = ({ vehiculo, onActualizarEstado, onCerrar, id = "vehiculoModal" }) => {
    useEffect(() => {
        if (vehiculo) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [vehiculo, id]);

    if (!vehiculo) return null;

    const detalles = [
        { label: "Placa", value: vehiculo.placa },
        { label: "Tipo de vehículo", value: vehiculo.tipoVehiculo },
        { label: "Tipo de terreno", value: vehiculo.tipoTerreno },
        { label: "Marca", value: vehiculo.marca },
        { label: "Modelo", value: vehiculo.modelo },
        { label: "Año", value: vehiculo.anio },
        { label: "Capacidad de pasajeros", value: vehiculo.capacidadPasajeros },
        { label: "SOAT", value: vehiculo.soat },
        { label: "Tecnomecánica", value: vehiculo.tecnomecanica },
        { label: "Antecedentes", value: vehiculo.antecedentes },
        { label: "Transmisión", value: vehiculo.tipoTransmision },
        { label: "Combustible", value: vehiculo.combustible },
        { label: "Kilometraje", value: vehiculo.kilometraje.toLocaleString() + " km" },
        { label: "Descripción", value: vehiculo.descripcion },
        { label: "ID del propietario", value: vehiculo.idPropietario },
        { label: "Fecha de registro", value: new Date(vehiculo.fechaRegistro).toLocaleDateString() },
        { label: "Cantidad de alquileres", value: vehiculo.cantidadAlquiler },
        { label: "Estado de la oferta", value: vehiculo.estadoOferta },
        { label: "Precio por día", value: `$${vehiculo.precioPorDia.toLocaleString()}` },
    ];

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Vehículo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                    </div>

                    <div className={`modal-body ${styles.modal__body}`}>
                        {vehiculo.fotosUrls?.[0] && (
                            <img src={vehiculo.fotosUrls[0]} alt="Foto vehículo" className="img-fluid mb-3" />
                        )}

                        <TableContainer component={Paper}>
                            <Table aria-label="Detalles del vehículo">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Atributo</StyledTableCell>
                                        <StyledTableCell>Valor</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detalles.map((detalle) => (
                                        <StyledTableRow key={detalle.label}>
                                            <StyledTableCell>{detalle.label}</StyledTableCell>
                                            <StyledTableCell>{detalle.value}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="modal-footer">
                        <Button variant="outlined" color="secondary" data-bs-dismiss="modal" onClick={onCerrar}>
                            Cerrar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => onActualizarEstado(vehiculo.placa, "rechazado")}
                        >
                            Rechazar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => onActualizarEstado(vehiculo.placa, "aprobado")}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailModal;
