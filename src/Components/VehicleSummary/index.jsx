import styles from "./index.module.css"

import { useState } from "react";

const VehicleSummay = ({ vehicle }) => {
    const [activePhoto, setActivePhoto] = useState(vehicle.fotosUrls[0]);

    const handleMouseEnter = (url) => {
        setActivePhoto(url);
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
                <button>Rent</button>
            </div>
        </section>
    );
};

export default VehicleSummay;
