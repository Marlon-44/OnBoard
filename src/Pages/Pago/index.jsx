import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";

const Pago = () => {
    const { idFactura } = useParams();
    const [factura, setFactura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFactura = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/facturas/${idFactura}`);
                if (!res.ok) throw new Error("Factura no encontrada");

                const data = await res.json();
                setFactura(data);
            } catch (err) {
                console.error(err);
                setError("Factura no encontrada o error en el servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchFactura();
    }, [idFactura]);

    useEffect(() => {
        if (factura && factura.estadoPago === "CREATED" && window.paypal) {
            // Evitar botones duplicados
            const container = document.getElementById("paypal-button-container");
            if (container) {
                container.innerHTML = "";
            }

            window.paypal.Buttons({
                createOrder: async () => {
                    const res = await fetch(`http://localhost:8080/api/pagos/crear?idFactura=${factura.idFactura}`, {
                        method: "POST"
                    });

                    const data = await res.json(); // ✅ lee el JSON correctamente
                    console.log("DATA>", data);
                    return data.orderId;
                },
                onApprove: async (data) => {
                    try {
                        const res = await fetch(`http://localhost:8080/api/pagos/capturar?orderId=${data.orderID}`, {
                            method: "POST"
                        });
                        const result = await res.json();

                        console.log("Resultado de PayPal:", result);

                        if (result.status === "COMPLETED") {
                            setPagoExitoso(true);
                            setFactura((prev) => ({ ...prev, estadoPago: "COMPLETED" }));
                        } else if (result.status === "APPROVED") {
                            setError("El pago fue aprobado pero aún no capturado.");
                        } else if (result.status === "VOIDED") {
                            setError("La orden fue anulada.");
                        } else if (result.status === "PAYER_ACTION_REQUIRED") {
                            setError("Se requiere una acción adicional del usuario para completar el pago.");
                        } else {
                            setError(`Estado inesperado: ${result.status}`);
                        }
                    } catch (err) {
                        console.error("Error al capturar el pago:", err);
                        setError("Ocurrió un error al capturar el pago.");
                    }
                },
                onError: (err) => {
                    console.error("Error en PayPal:", err);
                    setError("Ocurrió un error con PayPal.");
                }
            }).render("#paypal-button-container");
        }
    }, [factura]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box maxWidth="800px" mx="auto" mt={4}>
            <Typography variant="h4" gutterBottom>
                Detalles de la Factura
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Typography variant="subtitle1">ID Factura: {factura.idFactura}</Typography>
                <Typography variant="subtitle1">Fecha de Emisión: {factura.fechaEmision}</Typography>
                <Typography variant="subtitle1">Estado: {factura.estadoPago}</Typography>
                <Typography variant="subtitle1">Razón: {factura.razon}</Typography>

                <TableContainer sx={{ mt: 2 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Descripción</TableCell>
                                <TableCell align="right">Valor</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{factura.razon}</TableCell>
                                <TableCell align="right">${factura.total.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {factura.estadoPago === "CREATED" && (
                    <Box textAlign="center" mt={4}>
                        <div id="paypal-button-container" />
                    </Box>
                )}

                {(factura.estadoPago === "COMPLETED" || factura.estadoPago === "APPROVED") && (
                    <Box textAlign="center" mt={3}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Esta factura ya ha sido pagada.
                        </Alert>
                        <button
                            onClick={() => navigate("/dashboard")}
                            style={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "16px"
                            }}
                        >
                            Ver mis reservas
                        </button>
                    </Box>
                )}
            </Paper>

            <Snackbar
                open={pagoExitoso}
                autoHideDuration={4000}
                onClose={() => setPagoExitoso(false)}
            >
                <Alert severity="success" onClose={() => setPagoExitoso(false)}>
                    ¡Pago exitoso! Puedes revisar tu reserva activa en tu perfil.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Pago;
