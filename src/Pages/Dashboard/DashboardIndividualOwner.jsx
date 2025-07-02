import { useContext, useState } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import SidebarIndividualOwner from "../../Components/SidebarIndividualOwner";
import styles from "./dashboardIndividualOwner.module.css"
import WelcomeCard from "../../Components/WelcomeCard";
import ProfileSection from "../../Components/ProfileSection";
const DashboardIndividualOwner = () => {
    const {usuario}= useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("reservas");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "reservas":
                return <p>Reservas</p>;
            case "alquileres_activos":
                return <p>Alquileres Activos</p>;
            case "alquileres":
                return <p>Todos los Alquileres</p>;
            case "cuentas_x_pagar":
                return <p>OP4</p>;
            case "telefonos_emergencia":
                return <p>OP5</p>;
            default:
                return <p>Selecciona una opción del menú.</p>;
        }
    };

    return (
        <>
        <SidebarIndividualOwner
            onSeleccionarOpcion={setOpcionSeleccionada}
            opcionSeleccionada={opcionSeleccionada}
        />
            <div className={styles.dashboard__admin__container}>

                <section className={styles.variable__content}>
                    <WelcomeCard message="Aquí puedes gestionar tus alquileres, solicitudes y más."/>
                    <section className={styles.option__section}>
                        {renderContenido()}
                    </section>
                </section>
                <ProfileSection usuario={usuario} />

            </div>
        </>
    );
};

export default DashboardIndividualOwner;
