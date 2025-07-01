// src/Pages/Home/index.jsx
import { useContext, useState } from "react";
import Carrousel from "../../Components/Carrosuel";
import MainHeader from "../../Components/MainHeader";
import VehicleFilterForm from "../../Components/VehicleFilterForm";
import styles from "./index.module.css";
import OfertasContext from "../../features/ofertas/OfertasContext";
import VehicleCard from "../../Components/VehicleCard";
import Footer from "../../Components/Footer";

const Home = () => {
    const { ofertas, loading } = useContext(OfertasContext);
    console.log("ofertas: ", ofertas);
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 9;

    // Cálculo de índices
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = ofertas.slice(indexOfFirstVehicle, indexOfLastVehicle);

    const totalPages = Math.ceil(ofertas.length / vehiclesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPagination = () => {
        const pageItems = [];
        for (let i = 1; i <= totalPages; i++) {
            pageItems.push(
                <li
                    key={i}
                    className={`page-item ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    <a className="page-link" href="#">{i}</a>
                </li>
            );
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {pageItems}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <>
            <MainHeader />
            <Carrousel />
            <section className={styles.home__main__section}>
                <VehicleFilterForm />
                <section className={styles.home__vehicles__section}>
                    <div className={styles.vehicles__container}>
                        {loading ? (
                            <p>Cargando vehículos...</p>
                        ) : currentVehicles.length === 0 ? (
                            <p>No se encontraron vehículos.</p>
                        ) : (
                            currentVehicles.map((vehiculo) => (
                                <VehicleCard key={vehiculo.placa} vehicle={vehiculo} />
                            ))
                        )}
                    </div>
                    {ofertas.length > vehiclesPerPage && renderPagination()}
                </section>
            </section>
            <Footer/>
        </>

    );
};

export default Home;
