import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css"
import { motion } from "framer-motion";
const Header =()=>{
    const navigate = useNavigate();
    const handleClickLogin=()=>{
        
        navigate(`/login`)
    }
    const handleClickRegister=()=>{
        
        navigate(`/register`)
    }
    const handleClickLogo =()=>{
        navigate("/homePage")
    }
    return(
        <motion.header 
            initial={{y:-50 , opacity: 0}}
            animate={{y:0, opacity:1}}
            transition={{duration:2, ease:"easeOut"}}
            className={styles.header__container}>
            
                
                <div className={styles.header__logo__container}
                onClick={handleClickLogo}>
                    {/*<img src="assets/logo__op1.png" alt="" />*/}
                    <h1 >
                        OnBoard
                    </h1>
                </div>

                <div className={styles.header__buttons__container}>
                    <button onClick={handleClickLogin}>Login</button>
                    <button onClick={handleClickRegister}>Register</button>
                </div>
        </motion.header>
    )
}

export default Header;