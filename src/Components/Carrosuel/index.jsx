import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Carrousel = () => {
    return (
        <div
            id="carouselExampleIndicators"
            className={`carousel slide ${styles.carouselContainer}`}
            data-ride="carousel"
        >
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active position-relative">
                    <div className={`${styles.overlayContent} ${styles.right}`}>
                        <h4>OnBoard</h4>
                        <h2>SUV OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                    <img className="d-block w-100" src="assets/banner_img1.png" alt="First slide" />
                </div>

                <div className="carousel-item position-relative">
                    <div className={`${styles.overlayContent} ${styles.left}`}>
                        <h4>OnBoard</h4>
                        <h2>ELECTRIC OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                    <img className="d-block w-100" src="assets/banner_img2.png" alt="Second slide" />
                </div>

                <div className="carousel-item position-relative">
                    <div className={`${styles.overlayContent} ${styles.left}`}>
                        <h4>OnBoard</h4>
                        <h2>SPORT OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                    <img className="d-block w-100" src="assets/banner_img3.png" alt="Third slide" />
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Carrousel;
