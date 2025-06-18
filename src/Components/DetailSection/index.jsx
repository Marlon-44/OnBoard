import Subtitle from "../Subtitle";
import styles from "./index.module.css";

const DetailSection = ({vehicle}) => {
    return (
        <section className={styles.vehicle__details}>
            <Subtitle text ="Product Features"/>
            <table className={`table table-bordered ${styles.details__table}`}>
                <thead>
                    <tr>
                        <th scope="col">Concept</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Number plate</th>
                        <td>{vehicle.placa}</td>
                    </tr>
                    <tr>
                        <th scope="row">Vehicle type</th>
                        <td>{vehicle.tipoVehiculo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Brand</th>
                        <td>{vehicle.marca}</td>
                    </tr>
                    <tr>
                        <th scope="row">Model</th>
                        <td>{vehicle.modelo}</td>
                    </tr>
                    <tr>
                        <th scope="row">Capacity</th>
                        <td>{vehicle.capacidadPasajeros}</td>
                    </tr>
                    <tr>
                        <th scope="row">Transmission</th>
                        <td>{vehicle.tipoTransmision}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fuel</th>
                        <td>{vehicle.combustible}</td>
                    </tr>
                    <tr>
                        <th scope="row">Mileage</th>
                        <td>{vehicle.kilometraje}</td>
                    </tr>
                    <tr>
                        <th scope="row">Year</th>
                        <td>{vehicle.anio}</td>
                    </tr>
                </tbody>
            </table>
        </section>

    );
};

export default DetailSection;
