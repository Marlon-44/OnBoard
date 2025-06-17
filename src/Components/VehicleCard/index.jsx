import styles from "./index.module.css"
const VehicleCard =({vehicle})=>{
    return(
        <div className={styles.card__container}>
            <div className={styles.image__section}>
                <img src={vehicle.fotosUrls[0]} alt="" />
            </div>
            <div className={styles.info__section}>
                
                <h3>{`${vehicle.marca} ${vehicle.modelo}`}</h3>
                <h2>{` $${vehicle.precio} /day`}</h2>
                <p>{`${vehicle.anio} | ${vehicle.kilometraje} Km`}</p>
                <h4>Cartagena De Indias - Bolivar</h4>
            </div>
            <h2>{vehicle.placa}</h2>
        </div>
    )
}
export default VehicleCard;