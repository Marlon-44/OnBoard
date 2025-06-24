import { useContext } from "react";
import { VehicleRequestContext } from "../../features/vehicleRequests/VehicleRequestContext";

const VehicleRequestTable = () => {
    const { requestedVehicles, loadingRequests, errorRequests } = useContext(VehicleRequestContext);

    if (loadingRequests) return <p>Cargando vehículos pendientes...</p>;
    if (errorRequests) return <p>Error al cargar los vehículos: {errorRequests.message}</p>;
    if (!requestedVehicles.length) return <p>No hay vehículos pendientes de verificación.</p>;

    return (
        <div className="table-responsive">
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Placa</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {requestedVehicles.map((vehiculo, index) => (
                        <tr key={vehiculo.placa}>
                            <th scope="row">{index + 1}</th>
                            <td>{vehiculo.placa}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.tipoVehiculo}</td>
                            <td>{vehiculo.estadoOferta}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm">Ver más</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleRequestTable;
