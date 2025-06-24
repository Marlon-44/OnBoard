// SidebarAdmin.jsx
import styles from "./index.module.css";
import clsx from "clsx"; // Opcional: si usas 'clsx' para combinar clases de forma limpia

const SidebarAdmin = ({ onSeleccionarOpcion, opcionSeleccionada }) => (
    <aside className={styles.sidebar__container}>
        <div className={styles.logo}>
            <h2>OnBoard</h2>
        </div>
        <ul className={styles.sidebar__menu}>
            <li
                className={`${styles.menu__option} ${opcionSeleccionada === "solicitudes_usuario" ? styles.active : ""}`}
                onClick={() => onSeleccionarOpcion("solicitudes_usuario")}
            >
                <img src="/assets/icon__user__white.png" alt="" />
                Ver solicitudes de usuario
            </li>
            <li
                className={`${styles.menu__option} ${opcionSeleccionada === "solicitudes_vehiculo" ? styles.active : ""}`}
                onClick={() => onSeleccionarOpcion("solicitudes_vehiculo")}
            >
                <img src="/assets/icon__car__white.png" alt="" />
                Ver solicitudes de vehículos
            </li>
            <li
                className={`${styles.menu__option} ${opcionSeleccionada === "usuarios_registrados" ? styles.active : ""}`}
                onClick={() => onSeleccionarOpcion("usuarios_registrados")}
            >
                <img src="/assets/icon__user__white.png" alt="" />
                Usuarios registrados
            </li>
            <li
                className={`${styles.menu__option} ${opcionSeleccionada === "vehiculos_registrados" ? styles.active : ""}`}
                onClick={() => onSeleccionarOpcion("vehiculos_registrados")}
            >
                <img src="/assets/icon__car__white.png" alt="" />
                Vehículos registrados
            </li>
        </ul>
    </aside>
);

export default SidebarAdmin;
