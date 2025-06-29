import styles from "./index.module.css";
import { useContext } from "react";
import SesionContext from "../../features/sesion/SesionContext";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../ProfileSection";
import NotificationsIcon from '@mui/icons-material/Notifications';

const DashboardLayout = ({ children }) => {
    const { usuario, cerrarSesion } = useContext(SesionContext);
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate("/");
    };

    return (
        <div className={styles.dashboard__container}>
            <main className={styles.dashboard__main}>
                <header className={styles.dashboard__header}>
                    <NotificationsIcon/>
                    <p>|</p>
                    <p>{usuario?.nombre}</p>
                    <p>|</p>
                    <button onClick={handleCerrarSesion}>Cerrar sesión</button>
                </header>

                <section className={styles.dashboard__content}>
                    {children}
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;
