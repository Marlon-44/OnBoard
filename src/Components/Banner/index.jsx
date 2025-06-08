
import useIsMobile from "../../Hooks/useIsMobile";
import SearchBox from "../SearchBox";
import styles from "./index.module.css"

const Banner = () => {
    const isMobile = useIsMobile();

    return (
        <section className={styles.banner__container}>
            <video id="home-video" autoPlay muted loop>
                <source
                    src={isMobile ? "assets/car1_mobile.mp4" : "assets/car1.mp4"}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <SearchBox />
        </section>
    );
};


export default Banner;