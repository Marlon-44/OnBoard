import { useContext, useState } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import DashboardLayout from "../../Components/DashboardLayout";
import SidebarIndividualClient from "../../Components/SidebarIndividualClient.jsx";
import styles from "./dashboardIndividualClient.module.css"
import WelcomeCard from "../../Components/WelcomeCard";
import ProfileSection from "../../Components/ProfileSection";


const DashboardIndividualClient = () => {
    const { usuario } = useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("solicitudes_usuario");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "solicitudes_usuario":
                return <p>opciooon 1</p>
            case "solicitudes_vehiculo":
                return <p>opciooon 2</p>;
            case "usuarios_registrados":
                return <p>opciooon 3</p>;
            case "vehiculos_registrados":
                return <p>opciooon 4</p>
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
