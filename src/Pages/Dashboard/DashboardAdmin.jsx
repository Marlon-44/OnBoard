import { useState, useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import WelcomeCard from "../../Components/WelcomeCard";
import DashboardLayout from "../../Components/DashboardLayout";
import styles from "./dashboardAdmin.module.css";
import SidebarAdmin from "../../Components/SidebarAdmin";
import ProfileSection from "../../Components/ProfileSection";
import VehicleRequestTable from "../../Components/VehicleRequestTable";
import UserRequestTable from "../../Components/UserRequestTable";
import RegisteredUsersTable from "../../Components/RegisteredUsersTable";
import TablaVehiculosRegistrados from "../../Components/TablaVehiculosRegistrados/TablaVehiculosRegistrados";
import AllReservasTable from "../../Components/AllReservasTable";
import AllAlquileresTable from "../../Components/AllAlquileresTable";

const DashboardAdmin = () => {
    const { usuario } = useContext(SesionContext);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("solicitudes_usuario");

    const renderContenido = () => {
        switch (opcionSeleccionada) {
            case "solicitudes_usuario":
                return <UserRequestTable/>
            case "solicitudes_vehiculo":
                return <VehicleRequestTable/>;
            case "usuarios_registrados":
                return <RegisteredUsersTable/>;
            case "vehiculos_registrados":
                return <TablaVehiculosRegistrados/>
            case "allReservas":
                return <AllReservasTable/>;
            case "allAlquileres":
                return <AllAlquileresTable/>;
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
                    <WelcomeCard message="Aquí puedes gestionar usuarios, vehículos y más."/>
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
