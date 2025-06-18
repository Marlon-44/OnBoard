import { Link } from "react-router-dom";
import styles from "./index.module.css"
import { motion } from "framer-motion";
import Search from "../Search";
const MainHeader = () => {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={styles.header__container}>

            <div className={styles.header__up__section}>
                <div className={styles.logo__account__box}>
                    <h2>OnBoard</h2>
                    <Link to="/homePage" className={styles.header__logo__container}>
                        <img src="/assets/icon__user__black.png" alt="" />
                    </Link>
                </div>
                <Search/>
            </div>

            <div className={styles.header__down__section}>
                
                <div className={styles.hd__button__container}>
                    <button>Cars</button>
                    <button>Bikes</button>
                    <button>Yatches</button>
                    <button>Sport</button>
                    <button>SUV</button>
                    <button>Sedan</button>
                    <button>Van</button>
                </div>
                    
            </div>
        </motion.header>
    )
}

export default MainHeader;