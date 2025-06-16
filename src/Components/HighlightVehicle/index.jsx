import styles from "./index.module.css"
import {motion} from "framer-motion"
const HighlightVehicle =({vehicle})=>{
    return(
        <motion.div className={styles.vh__card__container}
            initial={{opacity: 0, y:100}}
            whileInView={{opacity: 1, y:0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            viewport={{once:true, amount: 0.2}}
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
                            viewport={{once:true, amount: 0.2}}>{ `${vehicle.marca} ${vehicle.modelo}`}</motion.h3>
                        <button>More Details</button>
                    </div>
                    
                    
                </div>
                
        </motion.div>
    )
}
export default HighlightVehicle;