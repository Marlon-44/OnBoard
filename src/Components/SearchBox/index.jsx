import styles from "./index.module.css"
import cities from "./cities"
import ComboBox from "../ComboBox";
import DateSelector from "../DateSelector/index,";
import { motion } from "framer-motion";
import TimesPicker from "../TimeSelector";
import TimeSelector from "../TimeSelector";
const SearchBox = () => {
    return (
        <motion.div 
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{duration: 2, ease:"easeOut"}}
            className={styles.search__container}>
                
            <ComboBox array={cities} />
            <DateSelector text="Fecha de Recogida"/>
            <TimeSelector text="Hora de Recogida"/>
            <DateSelector text="Fecha de Entrega"/>
            <TimeSelector text="Hora de Recogida"/>
            <button className={styles.search__button}>Buscar</button>
        </motion.div>
    )
}

export default SearchBox;
