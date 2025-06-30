import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";



import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import ReservarModalForm from "../ReservarModalForm";
import SesionContext from "../../features/sesion/SesionContext";
import { confirmarDisponibilidad } from "../../api/reserva";

const VehicleSummary = ({ vehicle }) => {
    const [activePhoto, setActivePhoto] = useState(vehicle.fotosUrls[0]);
    const [fechaHoraRecogida, setFechaHoraRecogida] = useState(null);
    const [fechaHoraEntrega, setFechaHoraEntrega] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });
    const [mostrarBotonReserva, setMostrarBotonReserva] = useState(
        localStorage.getItem("mostrarBotonReserva") === "true"
    );
    const [snackbarRolInvalido, setSnackbarRolInvalido] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { usuario } = useContext(SesionContext);

    const ROLES_PERMITIDOS = [
        "684f50a65541c74c24456a00",
        "6833e0d497afeccb1eaa3701",
        "6833e0e097afeccb1eaa3703",
        "6833e10397afeccb1eaa3704",
    ];

    useEffect(() => {
        const fechasInvalidas = !fechaHoraRecogida || !fechaHoraEntrega;

        if (fechasInvalidas) {
            setMostrarBotonReserva(false);
            localStorage.removeItem("mostrarBotonReserva");
        }
    }, [fechaHoraRecogida, fechaHoraEntrega]);


    useEffect(() => {
        if (fechaHoraRecogida || fechaHoraEntrega) {
            setMostrarBotonReserva(false);
            localStorage.removeItem("mostrarBotonReserva");
        }
    }, [fechaHoraRecogida, fechaHoraEntrega]);


    const handleMouseEnter = (url) => {
        setActivePhoto(url);
    };

    const [disponible, setDisponible] = useState(null);
    const resetFechasDisponibilidad = () => {
        setFechaHoraRecogida(null);
        setFechaHoraEntrega(null);
    };



    const handleCheckAvailability = async () => {
        if (!fechaHoraRecogida || !fechaHoraEntrega) {
            setAlerta({
                tipo: "info",
                mensaje: "Por favor selecciona ambas fechas antes de continuar.",
            });
            return;
        }

        const ahora = dayjs();
        const recogida = dayjs(fechaHoraRecogida);
        const entrega = dayjs(fechaHoraEntrega);

        const esHoy = recogida.isSame(ahora, 'day');
        const dosHorasDespues = ahora.add(2, "hour");

        if (esHoy && recogida.isBefore(dosHorasDespues)) {
            setAlerta({
                tipo: "warning",
                mensaje: "Si reservas para hoy, la hora de recogida debe ser al menos 2 horas después de la actual.",
            });
            return;
        }

        const doceHorasAntesEntrega = entrega.subtract(12, "hour");
        if (recogida.isAfter(doceHorasAntesEntrega)) {
            setAlerta({
                tipo: "warning",
                mensaje: "La fecha de recogida debe ser al menos 12 horas antes de la fecha de entrega.",
            });
            return;
        }

        if (!usuario) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        setAlerta({
            tipo: "info",
            mensaje: "Verificando disponibilidad del vehículo...",
        });

        try {
            console.log("PLACA> ", vehicle.placa)
            const fechasOcupadas = await confirmarDisponibilidad(vehicle.placa);
            console.log("Fechas ocupadas:", fechasOcupadas);

            // Generar fechas solicitadas
            const fechasSolicitadas = [];
            let fechaActual = dayjs(recogida).startOf("day");
            dayjs.extend(isSameOrBefore);
            while (fechaActual.isSameOrBefore(entrega.startOf("day"))) {
                fechasSolicitadas.push(fechaActual.format("YYYY-MM-DD"));
                fechaActual = fechaActual.add(1, "day");
            }

            console.log("Fechas solicitadas:", fechasSolicitadas);

            const hayConflicto = fechasSolicitadas.some(fecha =>
                fechasOcupadas.includes(fecha)
            );

            if (hayConflicto) {
                setDisponible(false);
                setAlerta({
                    tipo: "error",
                    mensaje: "No hay disponibilidad para las fechas seleccionadas.",
                });
                setMostrarBotonReserva(false);
                localStorage.removeItem("mostrarBotonReserva");
            } else {
                setDisponible(true);
                setAlerta({
                    tipo: "success",
                    mensaje: "¡Vehículo disponible! Ahora puedes solicitar la reserva.",
                });
                setMostrarBotonReserva(true);
                localStorage.setItem("mostrarBotonReserva", "true");
            }
        } catch (error) {
            console.error("Error al verificar disponibilidad:", error);
            setAlerta({
                tipo: "error",
                mensaje: "No se pudo verificar la disponibilidad. Intenta más tarde.",
            });
        }
    };






    const handleReservarClick = () => {
        if (!usuario) {
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        const tienePermiso = ROLES_PERMITIDOS.includes(usuario.idRol);

        if (!tienePermiso) {
            setSnackbarRolInvalido(true);
            return;
        }

        setMostrarModal(true);
    };

    const ocultarBotonReserva = () => {
        setMostrarBotonReserva(false);
        localStorage.removeItem("mostrarBotonReserva");
    };

    if (alerta.mensaje) {
        setTimeout(() => setAlerta({ tipo: "", mensaje: "" }), 4000);
    }

    return (
        <section className={styles.vehicle__summary}>
            <div className={styles.vehicle__photos}>
                <div className={styles.photos}>
                    {vehicle.fotosUrls.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`${vehicle.marca}-${index}`}
                            onMouseEnter={() => handleMouseEnter(url)}
                            className={styles.thumbnail}
                        />
                    ))}
                </div>
                <img className={styles.active} src={activePhoto} alt={vehicle.marca} />
            </div>

            <div className={styles.summary__info}>
                <h1>{vehicle.marca} {vehicle.modelo}</h1>
                <p> ⭐ ⭐ ⭐ ⭐ ⭐   5/5</p>
                <h2>${vehicle.precioPorDia}/day</h2>
                <p>{vehicle.descripcion}</p>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={styles.datetime__inputs}>
                        <DateTimePicker
                            label="Fecha y hora de recogida"
                            value={fechaHoraRecogida}
                            onChange={setFechaHoraRecogida}
                        />
                        <DateTimePicker
                            label="Fecha y hora de entrega"
                            value={fechaHoraEntrega}
                            onChange={setFechaHoraEntrega}
                        />
                    </div>
                </LocalizationProvider>

                {alerta.mensaje && (
                    <Stack sx={{ width: '100%', marginTop: "1rem" }}>
                        <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
                    </Stack>
                )}
                <div className={styles.button__container}>
                    {mostrarBotonReserva && (
                        <button

                            className={styles.reservar__button}
                            onClick={handleReservarClick}
                        >
                            Solicitar reserva
                        </button>
                    )}

                    <button
                        className={styles.check__button} onClick={handleCheckAvailability}>
                        Check availability
                    </button>
                </div>

            </div>

            <ReservarModalForm
                open={mostrarModal}
                onClose={() => setMostrarModal(false)}
                usuario={usuario}
                vehicle={vehicle}
                fechaHoraRecogida={fechaHoraRecogida?.toISOString()}
                fechaHoraEntrega={fechaHoraEntrega?.toISOString()}
                resetFechasDisponibilidad={resetFechasDisponibilidad}
                ocultarBotonReserva={ocultarBotonReserva}
            />

            <Snackbar
                open={snackbarRolInvalido}
                autoHideDuration={6000}
                onClose={() => setSnackbarRolInvalido(false)}
            >
                <Alert severity="warning" sx={{ width: '100%' }}>
                    No tienes permiso para acceder a esta funcionalidad. Solo usuarios con rol de cliente pueden reservar vehículos.
                </Alert>
            </Snackbar>
        </section>
    );
};

export default VehicleSummary;
