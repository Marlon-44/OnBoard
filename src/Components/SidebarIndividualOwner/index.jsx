import { useNavigate } from "react-router-dom";
import styles  from "./index.module.css"

const SidebarIndividualOwner = ({ onSeleccionarOpcion, opcionSeleccionada }) => {
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
                    className={`${styles.menu__option} ${opcionSeleccionada === "alquileres_activos" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("alquileres_activos")} >
                    <img src="/assets/icon__car__white.png" alt="" />
                    Alquileres Activos
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "alquileres" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("alquileres")}>
                    <img src="/assets/icon__user__white.png" alt="" />
                    Alquileres
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "cuentas_x_pagar" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("cuentas_x_pagar")}>
                    <img src="/assets/icon__user__white.png" alt="" />
                    Cuentas por Pagar
                </li>
                <li
                    className={`${styles.menu__option} ${opcionSeleccionada === "telefonos_emergencia" ? styles.active : ""}`}
                    onClick={() => onSeleccionarOpcion("telefonos_emergencia")}>
                    <img src="/assets/icon__user__white.png" alt="" />
                    Telefonos de Emergencia
                </li>
            </ul>
        </aside>
    )
};

export default SidebarIndividualOwner;
