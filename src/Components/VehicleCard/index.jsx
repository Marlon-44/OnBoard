import { useNavigate } from "react-router-dom";
import styles from "./index.module.css"
const VehicleCard = ({ vehicle }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/vehicle/${vehicle.placa}`);
    };

    return (
        <div className={styles.card__container} onClick={handleClick}>
            <div className={styles.image__section}>
                <img src={vehicle.fotosUrls[0]} alt={`${vehicle.marca} ${vehicle.modelo}`} />
            </div>
            <div className={styles.info__section}>
                <h3>{`${vehicle.marca} ${vehicle.modelo}`}</h3>
                <h2>{`$${vehicle.precioPorDia} /day`}</h2>
                <h3>Cartagena De Indias - Bolivar</h3>
                <p>{`${vehicle.anio} | ${vehicle.kilometraje} Km`}</p>
            </div>
        </div>
    );
};
export default VehicleCard;