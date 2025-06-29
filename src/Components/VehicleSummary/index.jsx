import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useState } from "react";

import dayjs from "dayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const VehicleSummary = ({ vehicle }) => {
    const [activePhoto, setActivePhoto] = useState(vehicle.fotosUrls[0]);
    const [fechaHoraRecogida, setFechaHoraRecogida] = useState(null);
    const [fechaHoraEntrega, setFechaHoraEntrega] = useState(null);

    const [alerta, setAlerta] = useState({ tipo: "", mensaje: "" });

    const navigate = useNavigate();
    const location = useLocation();

    const handleMouseEnter = (url) => {
        setActivePhoto(url);
    };

    const handleCheckAvailability = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!fechaHoraRecogida || !fechaHoraEntrega) {
        setAlerta({
            tipo: "info",
            mensaje: "Por favor selecciona ambas fechas antes de continuar.",
        });
        return;
    }

    const ahora = dayjs();

    // ⚠️ Si la fecha seleccionada es hoy, verificar la hora
    const esHoy = fechaHoraRecogida.isSame(ahora, 'day');
    const dosHorasDespues = ahora.add(2, "hour");

    if (esHoy && fechaHoraRecogida.isBefore(dosHorasDespues)) {
        setAlerta({
            tipo: "warning",
            mensaje: "Si reservas para hoy, la hora de recogida debe ser al menos 2 horas después de la actual.",
        });
        return;
    }

    const doceHorasAntesEntrega = fechaHoraEntrega.subtract(12, "hour");
    if (fechaHoraRecogida.isAfter(doceHorasAntesEntrega)) {
        setAlerta({
            tipo: "warning",
            mensaje: "La fecha de recogida debe ser al menos 12 horas antes de la fecha de entrega.",
        });
        return;
    }

    if (!usuario) {
        navigate("/login", { state: { from: location.pathname } });
    } else {
        alert(`
            Vehículo: ${vehicle.marca} ${vehicle.modelo}
            Placa: ${vehicle.placa}
            Fecha y hora de recogida: ${fechaHoraRecogida.format("YYYY-MM-DD HH:mm")}
            Fecha y hora de entrega: ${fechaHoraEntrega.format("YYYY-MM-DD HH:mm")}
        `);
    }
};



    // Ocultar alerta después de 4 segundos
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
                <button className={styles.check__button} onClick={handleCheckAvailability}>
                    Check availability
                </button>


            </div>
        </section>
    );
};

export default VehicleSummary;
