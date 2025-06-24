import { useParams } from "react-router-dom";
import { useContext } from "react";
import OfertasContext from "../../features/ofertas/OfertasContext";
import MainHeader from "../../Components/MainHeader";
import styles from "./index.module.css"
import VehicleSummay from "../../Components/VehicleSummary";
import DetailSection from "../../Components/DetailSection";
import { Reviews } from "@mui/icons-material";
import ReviewSection from "../../Components/ReviewSection";

const VehicleDetails = () => {
    const { placa } = useParams();
    const { ofertas } = useContext(OfertasContext);

    const vehicle = ofertas.find((v) => v.placa === placa);

    if (!vehicle) return <p>Vehículo no encontrado</p>;

    return (
        <>
            <MainHeader />
            <VehicleSummay vehicle={vehicle}/>
            <DetailSection vehicle={vehicle}/>
            <ReviewSection/>
            <Footer/>
        </>
    );
};

export default VehicleDetails;
