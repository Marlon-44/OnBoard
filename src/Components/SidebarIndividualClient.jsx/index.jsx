import { useNavigate } from "react-router-dom";
import styles from "./index.module.css"

const SidebarIndividualClient = ({ onSeleccionarOpcion, opcionSeleccionada }) => {
    const navigate = useNavigate();
    const handleClickLogo = () => {

        navigate(`/homePage`)
    }
    return (
        <aside className={styles.sidebar__container}>
            <div className={styles.logo}>
                <h2 onClick={handleClickLogo}>OnBoard</h2>
            </div>
            <ul className={styles.sidebar__menu}>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "reservas" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("reservas")} >
                    <img src="/assets/icon__user__white.png" alt="" />
                    Reservas
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "historial_alquileres" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("historial_alquileres")} >
                    <img src="/assets/icon__car__white.png" alt="" />
                    Historial de alquileres
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "alquileres" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("alquileres")}>
                    <img src="/assets/icon__user__white.png" alt="" />
                    Alquileres
                </li>
                
            </ul>
        </aside>
    )
};

export default SidebarIndividualClient;
