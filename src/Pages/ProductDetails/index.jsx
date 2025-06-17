import { useParams } from "react-router-dom";
import { useContext } from "react";
import OfertasContext from "../../features/ofertas/OfertasContext";
import MainHeader from "../../Components/MainHeader";

const ProductDetails = () => {
    const { placa } = useParams();
    const { ofertas } = useContext(OfertasContext);

    const vehiculo = ofertas.find((v) => v.placa === placa);

    if (!vehiculo) return <p>Vehículo no encontrado</p>;

    return (
        <>
            <MainHeader/>
            <section>
                
            </section>
            <h1>{vehiculo.marca} {vehiculo.modelo}</h1>
            <img src={vehiculo.fotosUrls[0]} alt={`${vehiculo.marca}`} />
            <p>Año: {vehiculo.anio}</p>
            <p>Precio por día: ${vehiculo.precioPorDia}</p>
            <p>Kilometraje: {vehiculo.kilometraje} Km</p>
            {/* Aquí puedes agregar galería de fotos y más detalles */}
        </>
    );
};

export default ProductDetails;
