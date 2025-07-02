// Dashboard.jsx
import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";

import DashboardAdmin from "./DashboardAdmin";
import DashboardCompanyOwner from "./DashboardCompanyOwner";
import DashboardCompanyClient from "./DashboardCompanyClient";
import DashboardCompanyDual from "./DashboardCompanyDual";
import DashboardIndividualClient from "./DashboardIndividualClient";
import DashboardIndividualOwner from "./DashboardIndividualOwner";
import DashboardIndividualDual from "./DashboardIndividualDual";
import DashboardLayout from "../../Components/DashboardLayout";

const Dashboard = () => {
    const { usuario } = useContext(SesionContext);

    const idRol = usuario?.idRol || usuario?.rol?.idRol;

    const renderContenidoDashboard = () => {
        switch (idRol) {//admin
            case "6833e09897afeccb1eaa3700":
                return <DashboardAdmin />;
            case "684f50a55541c74c244569ff"://companyowner
                return /*<DashboardCompanyOwner />*/<DashboardIndividualOwner />;
            case "6833e0e097afeccb1eaa3703":
                return <DashboardCompanyClient />;
            case "684f50a65541c74c24456a00":
                return <DashboardCompanyDual />;
            case "6833e0d497afeccb1eaa3701":
                return <DashboardIndividualClient />;
            case "6833e0db97afeccb1eaa3702"://individual owner
                return <DashboardIndividualOwner />;
            case "6833e10397afeccb1eaa3704":
                return <DashboardIndividualDual />;
            default:
                return <p>Rol no reconocido o no tienes acceso al dashboard.</p>;
        }
    };

    return (
        
            <DashboardLayout>
                {renderContenidoDashboard()}
            </DashboardLayout>

            
        
    );
};

export default Dashboard;

