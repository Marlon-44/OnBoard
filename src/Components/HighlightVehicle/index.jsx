import { useNavigate } from "react-router-dom"
import styles from "./index.module.css"
import {motion} from "framer-motion"
const HighlightVehicle =({vehicle})=>{

    const navigate = useNavigate();

    const handleNav =()=>{
        navigate(`/vehicle/${vehicle.placa}`);
    }

    return(
        <motion.div className={styles.vh__card__container}
            initial={{opacity: 0, y:100}}
            whileInView={{opacity: 1, y:0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            viewport={{once:true, amount: 0.2}}
            onClick={handleNav}
            >
            
                <div className={styles.vh__card__overlay}>
                    <div className={styles.vh__card__img}
                        
                    style={{
                        backgroundImage: `url(${vehicle.fotosUrls[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition:"center"
                    }}>
                    </div>
                    <div className={styles.vh__card__info}>
                        <motion.h3
                            initial={{opacity: 0, y:100}}
                            whileInView={{opacity: 1, y:0}}
                            transition={{duration: 1.5, ease: "easeOut"}}
                            viewport={{once:true, amount: 0.2}}>{ `${vehicle.marca.toUpperCase()} ${vehicle.modelo.toUpperCase()}`}</motion.h3>
                        
                        <div className={styles.description__item}>
                            <h6>Anio</h6>
                            <p>{`${vehicle.anio}`}</p>
                        </div>
                        <div className={styles.description__item}>
                            <h6>Transmision</h6>
                            <p>{`${vehicle.tipoTransmision}`}</p>
                        </div>
                        <div className={styles.description__item}>
                            <h6>Combustible</h6>
                            <p>{`${vehicle.anio}`}</p>
                        </div>
                    </div>
                    
                    
                </div>
                
        </motion.div>
    )
}
export default HighlightVehicle;