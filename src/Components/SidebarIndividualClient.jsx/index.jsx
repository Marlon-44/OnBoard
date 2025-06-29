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
                    className={`${styles.menu__option} ${opcionSeleccionada === "solicitudes_usuario" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("solicitudes_usuario")} >
                    <img src="/assets/icon__user__white.png" alt="" />
                    Reservas
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "solicitudes_vehiculo" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("solicitudes_vehiculo")} >
                    <img src="/assets/icon__car__white.png" alt="" />
                    Historial de alquileres
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "usuarios_registrados" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("usuarios_registrados")}>
                    <img src="/assets/icon__user__white.png" alt="" />
                    Alquileres
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "vehiculos_registrados" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("vehiculos_registrados")}>
                    <img src="/assets/icon__car__white.png" alt="" />
                    Vehículos registrados
                </li>
            </ul>
        </aside>
    )
};

export default SidebarIndividualClient;
