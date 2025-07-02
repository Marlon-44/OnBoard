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
import { getFacturasByClient } from "../../api/factura"; // asegúrate que el nombre y path coincidan
import SesionContext from "../../features/sesion/SesionContext";

const FacturasColumns = [
    { id: "idFactura", label: "ID Factura", minWidth: 100 },
    { id: "fechaEmision", label: "Fecha de Emisión", minWidth: 120 },
    { id: "total", label: "Total", minWidth: 100 },
    { id: "estadoPago", label: "Estado de Pago", minWidth: 100 },
];

export default function CuentasXPagarUCTable() {
    const {usuario} =useContext(SesionContext)
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const data = await getFacturasByClient(usuario.idUsuario);
                setFacturas(data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (usuario) fetchFacturas();
    }, [usuario]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <p>Cargando facturas...</p>;
    if (error) return <p>Error al cargar las facturas: {error.message}</p>;

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} style={{ borderRadius: "1rem" }}>
            <TableContainer sx={{ maxHeight: "48vh", minHeight: "48vh" }}>
                <Table stickyHeader aria-label="tabla de facturas">
                    <TableHead>
                        <TableRow>
                            {FacturasColumns.map((column) => (
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
                        {facturas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((factura) => (
                                <TableRow hover key={factura.idFactura}>
                                    <TableCell>{factura.idFactura}</TableCell>
                                    <TableCell>{formatFecha(factura.fechaEmision)}</TableCell>
                                    <TableCell>${factura.total.toFixed(2)}</TableCell>
                                    <TableCell>{factura.estadoPago}</TableCell>
                                    <TableCell>
                                        {factura.estadoPago === "PENDIENTE" && (
                                            <button
                                                onClick={() =>
                                                    window.location.href = `/pago/${factura.idFactura}`
                                                }
                                                style={{
                                                    background: "#198754",
                                                    border: "none",
                                                    padding: "0.4rem 0.8rem",
                                                    borderRadius: "5px",
                                                    color: "white",
                                                }}
                                            >
                                                Pagar
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={facturas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
