import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";

const DashboardCompanyOwner = () => {
const {usuario}= useContext(SesionContext)
    return (
        <div>
            <h1>Bienvenido Administrador, {usuario.nombre}</h1>
            <p>Aquí puedes gestionar usuarios, vehículos y más.</p>
            {/* Agrega componentes específicos para el admin */}
        </div>
    );
};

export default DashboardCompanyOwner;