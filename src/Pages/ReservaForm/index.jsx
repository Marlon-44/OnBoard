import { useLocation } from "react-router-dom";

const ReservaForm = () => {
    const { state } = useLocation();
    const { usuario, vehicle, fechaHoraRecogida, fechaHoraEntrega } = state;

    return (
        <div>
            <h1>Formulario de Reserva</h1>
            <p>Usuario: {usuario?.nombre}</p>
            <p>Vehículo: {vehicle?.marca} {vehicle?.modelo}</p>
            <p>Recogida: {fechaHoraRecogida}</p>
            <p>Entrega: {fechaHoraEntrega}</p>
            {/* Aquí tu formulario con esos datos prellenados o ocultos */}
        </div>
    );
};

export default ReservaForm;
