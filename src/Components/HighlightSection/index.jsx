import useIsMobile from "../../Hooks/useIsMobile";
import styles from "./index.module.css"
import HighlightVehicle from "../HighlightVehicle";
import {motion} from "framer-motion"
import { useFeaturedVehicleContext } from "../../features/featuredVehicles/FeaturedVehiclesContext";
import { Link } from "react-router-dom";
const HighlightSection = () => {
    const isMobile = useIsMobile();
    const { featuredVehicles, loading, error } = useFeaturedVehicleContext();
    
    console.log("FEATURED VEHICLES: ", featuredVehicles)
    return (
        <section className={styles.highligth__section__container}>
            
            <div className={styles.highligth__section}>
                {/*<video id="home-video" autoPlay muted loop>
                    <source
                        src={isMobile ? "assets/cloud.mp4" : "assets/cloud.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>*/}
                <div className={styles.highligth__section__inside}>

                    <h2 className={styles.highligth__section__title}>FEATURED VEHICLES</h2>

                    <div className={styles.highligth__section__box}>
                        {loading && <p>Cargando vehículos...</p>}
                        {error && <p>Ocurrió un error: {error.message}</p>}
                        {featuredVehicles.map((vehicle) => (
                        <HighlightVehicle 
                            key={vehicle.id} 
                            vehicle={vehicle}/>
                        ))}
                    </div>
                    
                        
                        <Link to="/homePage"
                            className={styles.link}
                            initial={{opacity: 0, y:50}}
                            whileInView={{opacity: 1, y:0}}
                            transition={{duration: 1.5, ease: "easeOut"}}
                            viewport={{once:true, amount: 0.2}}>
                            View More
                        </Link>
                    
                </div>
                
            </div>

                

        </section>
    )
}

export default HighlightSection;