// src/Pages/Home/index.jsx
import { useContext } from "react";
import Carrousel from "../../Components/Carrosuel";
import MainHeader from "../../Components/MainHeader";
import VehicleFilterForm from "../../Components/VehicleFilterForm";
import styles from "./index.module.css";
import OfertasContext from "../../features/ofertas/OfertasContext";
import VehicleCard from "../../Components/VehicleCard";

const Home = () => {
    const { ofertas, loading } = useContext(OfertasContext);
    console.log("ofertas: ", ofertas)
    return (
        <>
            <MainHeader />
            <Carrousel />
            <section className={styles.home__main__section}>
                <VehicleFilterForm />
                <section className={styles.home__vehicles__section}>
                    <div className={styles.title__box}>
                        <h2>Our Options For You</h2>
                    </div>
                    <div className={styles.vehicles__container}>
                        {loading ? (
                            <p>Cargando vehículos...</p>
                        ) : ofertas.length === 0 ? (
                            <p>No se encontraron vehículos.</p>
                        ) : (
                            ofertas.map((vehiculo) => (
                                <VehicleCard key={vehiculo.id} data={vehiculo} />
                            ))
                        )}
                    </div>
                </section>
            </section>
        </>
    );
};

export default Home;
