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

const UserDetailModal = ({ user, id = "userModal", onActualizarEstado, onCerrar }) => {
    useEffect(() => {
        if (user) {
            const modal = new window.bootstrap.Modal(document.getElementById(id));
            modal.show();
        }
    }, [user, id]);

    if (!user) return null;

    const userDetails = [
        { label: "ID Usuario", value: user.idUsuario },
        { label: "Tipo de identificación", value: user.tipoIdentificacion },
        { label: "Nombre", value: user.nombre },
        { label: "Correo", value: user.correo },
        { label: "Teléfono", value: user.telefono },
        { label: "Dirección", value: user.direccion },
        { label: "Fecha de registro", value: new Date(user.fechaRegistro).toLocaleDateString() },
        { label: "Cuenta bancaria", value: user.cuentaBancaria },
        { label: "Rol", value: user.idRol },
        { label: "Estado de verificación", value: user.estadoVerificacion },
    ];

    const handleActualizar = (estado) => {
        if (onActualizarEstado) {
            onActualizarEstado(user.idUsuario, estado);
        }
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles del Usuario</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Cerrar"
                            onClick={onCerrar}
                        ></button>
                    </div>

                    <div className={`modal-body ${styles.modal__body}`}>
                        {user.fotoPerfilUrl && (
                            <img src={user.fotoPerfilUrl} alt="Foto de perfil" className="img-fluid mb-3" />
                        )}

                        <TableContainer component={Paper} sx={{ width: "60%" }}>
                            <Table sx={{ width: "100%" }} aria-label="User Details Table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Atributo</StyledTableCell>
                                        <StyledTableCell>Valor</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userDetails.map((detail) => (
                                        <StyledTableRow key={detail.label}>
                                            <StyledTableCell component="th" scope="row">
                                                {detail.label}
                                            </StyledTableCell>
                                            <StyledTableCell>{detail.value}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="modal-footer">
                        <Button
                            variant="outlined"
                            color="secondary"
                            data-bs-dismiss="modal"
                            onClick={onCerrar}
                        >
                            Cerrar
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleActualizar("rechazado")}
                            sx={{ ml: 1 }}
                        >
                            Rechazar
                        </Button>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleActualizar("aprobado")}
                            sx={{ ml: 1 }}
                        >
                            Aceptar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
