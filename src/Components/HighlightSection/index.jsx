import useIsMobile from "../../Hooks/useIsMobile";
import styles from "./index.module.css"
import { useVehicleContext } from "../../features/vehicles/VehicleContext";
import HighlightVehicle from "../HighlightVehicle";
const HighlightSection = () => {
    const isMobile = useIsMobile();
    const { vehicles, loading, error } = useVehicleContext();
    console.log("VEHICLES: ", vehicles)
    return (
        <section className={styles.highligth__section__container}>

            <div className={styles.highligth__section}>
                <video id="home-video" autoPlay muted loop>
                    <source
                        src={isMobile ? "assets/car1_mobile.mp4" : "assets/traffic.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

            </div>
            <div className={styles.highligth__section}>
                <div className={styles.highligth__section__box}>
                    {loading && <p>Cargando vehículos...</p>}
                    {error && <p>Ocurrió un error: {error.message}</p>}
                    {vehicles.map((vehicle) => (
                    <HighlightVehicle key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
                

        </section>
    )
}

export default HighlightSection;