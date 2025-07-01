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

const AllAlquileresModal = ({ alquiler, onCerrar, onActualizarEstado, id = "alquilerModal" }) => {
    useEffect(() => {
        if (alquiler) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [alquiler, id]);

    if (!alquiler) return null;

    const detalles = [
        { label: "ID Alquiler", value: alquiler.idAlquiler },
        { label: "ID Reserva", value: alquiler.idReserva },
        { label: "Estado", value: alquiler.estado },
        {
            label: "Fecha de Novedad",
            value: new Date(alquiler.fechaNovedad).toLocaleString("es-CO", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            }),
        },
        {
            label: "Precio Total",
            value: `$ ${Number(alquiler.precioTotal).toLocaleString("es-CO")}`,
        },
    ];

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Alquiler</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
                    </div>

                    <div className={`modal-body ${styles.modal__body}`}>
                        <TableContainer component={Paper}>
                            <Table aria-label="Detalles del alquiler">
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
                        {onActualizarEstado && (
                            <>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => onActualizarEstado(alquiler.idAlquiler, "rechazado")}
                                >
                                    Rechazar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => onActualizarEstado(alquiler.idAlquiler, "aprobado")}
                                >
                                    Aceptar
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllAlquileresModal;
