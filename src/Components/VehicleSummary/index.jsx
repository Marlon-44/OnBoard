import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.css"

import { useState } from "react";

const VehicleSummay = ({ vehicle }) => {
    const [activePhoto, setActivePhoto] = useState(vehicle.fotosUrls[0]);
    const navigate = useNavigate();
    const location = useLocation();
    const handleMouseEnter = (url) => {
        setActivePhoto(url);
    };

    const handleRentClick = () => {
        const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

        if (!usuario) {
            // Redirigir al login y guardar la URL actual
            navigate("/login", {
                state: { from: location.pathname },
            });
        } else {
            // Lógica de alquiler futura
            alert("Usuario logueado. Preparando alquiler...");
        }
    };

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
                <img className={styles.active} src={activePhoto} alt={`${vehicle.marca}`} />
            </div>

            <div className={styles.summary__info}>
                <h1>{vehicle.marca} {vehicle.modelo}</h1>
                <p> ⭐ ⭐ ⭐ ⭐ ⭐   5/5</p>
                <h2>${vehicle.precioPorDia}/day</h2>
                <p>{vehicle.descripcion}</p>
                <button onClick={handleRentClick}>Rent</button>
            </div> 
        </section>
    );
};

export default VehicleSummay;
