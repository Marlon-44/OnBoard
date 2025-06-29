import styles from "./index.module.css";
import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";

const WelcomeCard = ({message}) => {
    const { usuario } = useContext(SesionContext);
    const date = new Date();

    return (
        <div className={styles.welcome__card}>
            <div className={styles.date__container}>
                <img src="/assets/calendar__icon__white.png" alt="" />
                <h6 className={styles.current__date}>
                    {date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
                </h6>
                
            </div>

            <div>
                <h1>Buen día, {usuario.nombre}</h1>
                <h6>{message}</h6>
            </div>

        </div>
    );
};

export default WelcomeCard;
