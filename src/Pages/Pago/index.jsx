import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const Pago = () => {
    const { idFactura } = useParams();
    const navigate = useNavigate();
    const [factura, setFactura] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagoExitoso, setPagoExitoso] = useState(false);
    const [error, setError] = useState(null);

    // Simular carga de factura desde backend
    useEffect(() => {
        setTimeout(() => {
            // Simulación de fetch
            if (idFactura === "mock-id-999") {
                setFactura({
                    idFactura: "mock-id-123",
                    idReserva: "reserva-xyz",
                    total: 321280,
                    fechaEmision: "2025-06-29",
                    razon: "Reserva de vehículo por 2 días",
                    estado: "PENDIENTE"
                });
                setLoading(false);
            } else {
                setError("Factura no encontrada");
                setLoading(false);
            }
        }, 1000);
    }, [idFactura]);

    const handlePagar = () => {
    // Simulación de pago exitoso
    setTimeout(() => {
        // 1. Crear objeto de pago (simulado)
        const pago = {
            idPago: `pago-${Date.now()}`,
            idFactura: factura.idFactura,
            fecha: new Date().toISOString(),
            metodo: "Simulado",
            estado: "COMPLETADO"
        };
        console.log("Pago registrado:", pago);

        // 2. Actualizar estado de factura
        const facturaActualizada = { ...factura, estado: "PAGADA" };
        setFactura(facturaActualizada);

        // 3. Actualizar reserva (simulada)
        // Nota: Idealmente deberías tener un hook o un contexto para obtener la reserva asociada
        const reservaSimulada = {
            idReserva: factura.idReserva,
            fechaInicio: new Date("2025-06-30"), // <-- asegúrate que sea correcta o dinamízala
            estadoReserva: "PENDIENTE",
        };

        const diasAnticipacion = dayjs(reservaSimulada.fechaInicio).diff(dayjs(), "day");

        let alquiler = null;

        if (diasAnticipacion < 3) {
            // 4. Crear alquiler si la anticipación es menor a 3 días
            alquiler = {
                idAlquiler: `alq-${Date.now()}`,
                idReserva: reservaSimulada.idReserva,
                fechaInicio: reservaSimulada.fechaInicio,
                estado: "ACTIVO"
            };
            console.log("Alquiler creado automáticamente:", alquiler);
        }

        console.log("Reserva activada:", {
            ...reservaSimulada,
            estadoReserva: "ACTIVA"
        });

        // Mostrar notificación
        setPagoExitoso(true);
    }, 1500);
};


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
                <Typography variant="subtitle1">Estado: {factura.estado}</Typography>
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

                {factura.estado === "PENDIENTE" && (
                    <Box textAlign="right" mt={3}>
                        <Button variant="contained" color="primary" onClick={handlePagar}>
                            Pagar ahora
                        </Button>
                    </Box>
                )}

                {factura.estado === "PAGADA" && (
                    <Box textAlign="center" mt={3}>
                        <Alert severity="success">Esta factura ya ha sido pagada.</Alert>
                    </Box>
                )}
            </Paper>

            <Snackbar
                open={pagoExitoso}
                autoHideDuration={4000}
                onClose={() => setPagoExitoso(false)}
            >
                <Alert severity="success" onClose={() => setPagoExitoso(false)}>
                    ¡Pago exitoso! Puedes revisar tu reserva activa en el panel de usuario.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Pago;
