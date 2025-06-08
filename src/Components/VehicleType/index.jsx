import styles from "./index.module.css"

const VehicleType = ({number, ref}) => {
    return (
        <div className={styles.vehicle__type__container}
        style={{backgroundImage: `url(${ref})`}}>
            <div className={styles.vehicle__type__overlay} >
                <div className={styles.vehicle__type__info}>
                    <h2>{number}</h2>
                </div>

                <button className={styles.vehicle__type__button}>
                    <a>Explore Now</a>
                    <img src="assets/chebron__right.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default VehicleType;