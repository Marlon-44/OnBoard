import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    FormControlLabel,
    Checkbox,
    Link,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import Alert from "@mui/material/Alert";
import mapboxgl from "mapbox-gl";
import dayjs from "dayjs";
import { crearReserva } from "../../api/reserva";
import { crearFactura } from "../../api/factura";
import FacturaResumen from "../FacturaResumen";
import { useNavigate } from "react-router-dom";
import ReservaContext from "../../features/reserva/ReservaContext";
import FacturaContext from "../../features/factura/FacturaContext";
import { crearOrdenPaypal } from "../../api/paypal";

mapboxgl.accessToken = "pk.eyJ1IjoiZGFsbWF0YSIsImEiOiJjbWNpM2VkdDUxMjFzMnlwdGg5eGh4N2xoIn0.DUiFxWzL75SniPLlWoilRg";

const ReservarModalForm = ({
    open,
    onClose,
    usuario,
    vehicle,
    fechaHoraRecogida,
    fechaHoraEntrega,
    ocultarBotonReserva,
    resetFechasDisponibilidad
}) => {


    const [direccion, setDireccion] = useState("");
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const mapContainerRef = useRef(null);
    const markerRef = useRef(null);
    const { agregarReserva } = useContext(ReservaContext);
    const { agregarFactura } = useContext(FacturaContext);

    const diasTotales = Math.ceil(
        (dayjs(fechaHoraEntrega).diff(dayjs(fechaHoraRecogida), 'hour')) / 24
    );
    const precioPorDia = vehicle?.precioPorDia || 0;
    const subtotal = diasTotales * precioPorDia;
    const impuesto4x1000 = subtotal * 0.004;
    const total = subtotal + impuesto4x1000;
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) return;

        const timeout = setTimeout(() => {
            if (!mapContainerRef.current) return;

            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-75.5479, 10.4236],
                zoom: 13
            });

            map.on("click", async (e) => {
                const { lng, lat } = e.lngLat;

                if (markerRef.current) markerRef.current.remove();

                const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
                markerRef.current = marker;

                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
                );
                const data = await response.json();
                const place = data.features[0]?.place_name;

                if (place) setDireccion(place);
                else setDireccion("Ubicación no encontrada");
            });
        }, 100);

        return () => clearTimeout(timeout);
    }, [open]);

    const handleConfirmar = async () => {
        if (!aceptaTerminos) {
            alert("Debe aceptar los términos y condiciones para continuar.");
            return;
        }

        if (!direccion) {
            alert("Debe seleccionar una dirección en el mapa.");
            return;
        }

        try {
            // 1. Datos para crear reserva
            const datosReserva = {
                idCliente: usuario.idUsuario,
                idVehiculo: vehicle.placa,
                fechaInicio: fechaHoraRecogida,
                fechaFin: fechaHoraEntrega,
                lugarEntregaYRecogida: direccion,
                estadoReserva: "PENDIENTE"
            };

            alert("Datos enviados a crearReserva:\n" + JSON.stringify(datosReserva, null, 2));
            const reservaResponse = await crearReserva(datosReserva);
            const reserva = reservaResponse.data;
            agregarReserva(reserva);

            // 2. Crear factura con solo el idReserva
            const facturaId = reserva.idFactura || reserva.idReserva;

            alert("ID enviado a crearFactura:\n" + facturaId);
            const facturaResponse = await crearFactura(facturaId);
            const factura = facturaResponse;
            agregarFactura(factura);

            // 3. Redirigir a PayPal
            if (factura.url) {
                alert("Redirigiendo a URL de PayPal:\n" + factura.url);
                window.location.href = factura.url;
            } else {
                throw new Error("No se recibió una URL válida desde PayPal");
            }

        } catch (error) {
            console.error("Error en el proceso de reserva y pago:", error);
            alert("Ocurrió un error. Intenta más tarde.");
        }
    };





    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>Formulario de Reserva</DialogTitle>
                <DialogContent dividers>
                    <Typography variant="h6">Información del Usuario</Typography>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} my={1}>
                        <TextField label="Nombre" defaultValue={usuario?.nombre} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Cédula" defaultValue={usuario?.idUsuario} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Correo" defaultValue={usuario?.correo} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Teléfono" defaultValue={usuario?.telefono} slotProps={{ input: { readOnly: true } }} />
                    </Box>

                    <Typography variant="h6" mt={2}>Información del Vehículo</Typography>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} my={1}>
                        <TextField label="Marca" defaultValue={vehicle?.marca} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Modelo" defaultValue={vehicle?.modelo} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Placa" defaultValue={vehicle?.placa} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Tipo de Vehículo" defaultValue={vehicle?.tipoVehiculo} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Año" defaultValue={vehicle?.anio} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Precio por día" defaultValue={`$${precioPorDia}`} slotProps={{ input: { readOnly: true } }} />
                    </Box>

                    <Typography variant="h6" mt={2}>Datos de la Reserva</Typography>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} my={1}>
                        <TextField label="Fecha y Hora de Recogida" value={fechaHoraRecogida} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Fecha y Hora de Entrega" value={fechaHoraEntrega} slotProps={{ input: { readOnly: true } }} />
                        <TextField label="Cantidad de días" value={diasTotales} slotProps={{ input: { readOnly: true } }} />
                    </Box>

                    <FacturaResumen diasTotales={diasTotales} precioPorDia={precioPorDia} />

                    <Box mt={4}>
                        <Typography mb={1}>Selecciona el lugar de entrega y recogida:</Typography>
                        <div ref={mapContainerRef} style={{ width: "100%", height: "300px", borderRadius: "10px" }} />
                        <TextField
                            label="Dirección seleccionada"
                            value={direccion}
                            fullWidth
                            margin="normal"
                            slotProps={{ input: { readOnly: true } }}
                        />
                    </Box>

                    <FormControlLabel
                        control={<Checkbox checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} color="primary" />}
                        label={<Typography variant="body2">Acepto los <Link href="https://lklfmpejhtqwuhlyhpud.supabase.co/storage/v1/object/public/documentos/negocio/terminos_condiciones_onboard.pdf" target="_blank" rel="noopener">términos y condiciones</Link> y me comprometo a responder por cualquier daño, infracción o uso indebido del vehículo reservado durante el tiempo de uso, aceptando total responsabilidad legal y económica derivada del servicio.</Typography>}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">Cancelar Reserva</Button>
                    <Button onClick={handleConfirmar} variant="contained" color="primary">Ir al Pago</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    ¡Reserva exitosa! Puedes revisar el estado de tu solicitud en tu perfil.
                </Alert>
            </Snackbar>
        </>
    );
};

export default ReservarModalForm;
