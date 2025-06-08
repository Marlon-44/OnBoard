
import VehicleType from "../VehicleType";
import styles from "./index.module.css"

const TerrenoSection =()=>{
    return(
        <section className={styles.terreno__section}>
            <VehicleType number="01" ref="assets/car_bw.jpg"/>
            <VehicleType number="02" ref="assets/bike_bw.jpg"/>
            <VehicleType number="03" ref="assets/yatch_bw.jpg"/>
        </section>
    )
}

export default TerrenoSection;