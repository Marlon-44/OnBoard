import styles from "./index.module.css"
import { motion } from "framer-motion";
const Header =()=>{
    return(
        <motion.header 
            initial={{y:-50 , opacity: 0}}
            animate={{y:0, opacity:1}}
            transition={{duration:2, ease:"easeOut"}}
            className={styles.header__container}>
            
                <div className={styles.header__logo__container}>
                    <img src="assets/logo__op1.png" alt="" />
                </div>
                <div className={styles.header__buttons__container}>
                    <button>Login</button>
                    <button>Register</button>
                </div>
        </motion.header>
    )
}

export default Header;