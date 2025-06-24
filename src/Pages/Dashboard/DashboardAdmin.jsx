import { useState, useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import WelcomeCard from "../../Components/WelcomeCard";
import DashboardLayout from "../../Components/DashboardLayout";
import styles from "./dashboardAdmin.module.css";
import SidebarAdmin from "../../Components/SidebarAdmin";
import ProfileSection from "../../Components/ProfileSection";
import TablaVehiculosRegistrados from "../../Components/TablaVehiculosRegistrados/TablaVehiculosRegistrados";
import VehicleRequestTable from "../../Components/VehicleRequestTable";

const DashboardAdmin = () => {
    const { usuario } = useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("usuarios_registrados");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "solicitudes_usuario":
                return <p>Aquí iría el contenido de solicitudes de usuario</p>;
            case "solicitudes_vehiculo":
                return <VehicleRequestTable/>;
            case "usuarios_registrados":
                return <p>Listado de usuarios registrados</p>;
            case "vehiculos_registrados":
                return <TablaVehiculosRegistrados/>
            default:
                return <p>Selecciona una opción del menú.</p>;
        }
    };

    return (
        <>
            <SidebarAdmin
                onSeleccionarOpcion={setOpcionSeleccionada}
                opcionSeleccionada={opcionSeleccionada}
            />

            <div className={styles.dashboard__admin__container}>

                <section className={styles.variable__content}>
                    <WelcomeCard />
                    <section className={styles.option__section}>
                        {renderContenido()}
                    </section>
                </section>
                <ProfileSection usuario={usuario} />

            </div>
        </>
    );
};

export default DashboardAdmin;
