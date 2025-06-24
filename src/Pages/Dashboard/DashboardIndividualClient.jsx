import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import DashboardLayout from "../../Components/DashboardLayout";

// src/Pages/Dashboard/DashboardParticularCliente.jsx
const DashboardIndividualClient = () => {

    const {usuario}= useContext(SesionContext)
    return (
        <DashboardLayout>
            <h1>Bienvenido {usuario.nombre}</h1>
            <p>Tu rol: Particular</p>
            <p>Aquí puedes ver tus alquileres, historial y más.</p>
            {/* Agrega más funcionalidades específicas del cliente */}
        </DashboardLayout>
        
    );
};

export default DashboardIndividualClient;
