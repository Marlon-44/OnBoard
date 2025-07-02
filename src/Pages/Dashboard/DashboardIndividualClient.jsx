import { useContext, useState } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import DashboardLayout from "../../Components/DashboardLayout";
import SidebarIndividualClient from "../../Components/SidebarIndividualClient.jsx";
import styles from "./dashboardIndividualClient.module.css"
import WelcomeCard from "../../Components/WelcomeCard";
import ProfileSection from "../../Components/ProfileSection";
import ReservasUCTable from "../../Components/ReservasUCTable/index.jsx";
import CuentasXPagarUCTable from "../../Components/CuentasXPagarUCTable/index.jsx";
import AlquileresActivosUCTable from "../../Components/AlquileresActivosUCTable/index.jsx";
import AllAlquileresUCTable from "../../Components/AllAlquileresUCTable/index.jsx";


const DashboardIndividualClient = () => {
    const { usuario } = useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("reservas");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "reservas":
                return <ReservasUCTable idUsuario={usuario.idUsuario}/>
            case "historial_alquileres":
                return <AllAlquileresUCTable/>;
            case "alquileres_activosIC":
                return <AlquileresActivosUCTable/>;
            case "cuentas_x_pagar":
                return <CuentasXPagarUCTable/>;
            case "telefonos_emergencia":
                return <p>Telefonos de emergencia</p>;
            default:
                return <p>Selecciona una opción del menú.</p>;
        }
    };

    return (
        <>  
            <SidebarIndividualClient
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

export default DashboardIndividualClient;
