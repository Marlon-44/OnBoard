import { useEffect } from "react";
import styles from "./index.module.css"

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

const AllReservasModal = ({ reserva, onActualizarEstado, onCerrar, id = "reservaModal" }) => {
    useEffect(() => {
        if (reserva) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [reserva, id]);

    if (!reserva) return null;

    const detalles = [
        { label: "Reserva", value: reserva.idReserva },
        { label: "Cliente", value: reserva.idCliente },
        { label: "Vehiculo", value: reserva.idVehiculo },
        { label: "Fecha de Inicio", value: reserva.fechaInicio },
        { label: "Feca de Fin", value: reserva.fechaFin },
        { label: "Lugar de Entrega ", value: reserva.lugarEntregaYRecogida },
        { label: "Lugar de Entrega y Recogida", value: reserva.lugarEntregaYRecogida },
        { label: "Estado", value: reserva.estadoReserva },
        
    ];

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles de la Reserva</h5>
                        <button type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Cerrar"
                        onClick={onCerrar} />
                    </div>

                    <div className={`modal-body ${styles.modal__body}`}>

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
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllReservasModal;
