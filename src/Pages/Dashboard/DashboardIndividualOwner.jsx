import { useContext, useState } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import SidebarIndividualOwner from "../../Components/SidebarIndividualOwner";
import styles from "./dashboardIndividualOwner.module.css"
import WelcomeCard from "../../Components/WelcomeCard";
import ProfileSection from "../../Components/ProfileSection";
import AlquileresActivosIOTable from "../../Components/AlquileresActivosIOTable";
import AllAlquileresIOTable from "../../Components/AllAlquileresIOTable";
import MisVehiculosIOTable from "../../Components/MisVehiculosIOTable";
import AllReservasIOTable from "../../Components/AllReservasIOTable";
const DashboardIndividualOwner = () => {
    const {usuario}= useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("reservas");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "reservas":
                return <AllReservasIOTable/>;
            case "alquileres_activos":
                return <AlquileresActivosIOTable/>;
            case "alquileres":
                return <AllAlquileresIOTable/>;
            case "mis_vehiculos":
                return <MisVehiculosIOTable/>;
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
