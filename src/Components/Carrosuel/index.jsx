import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Carrousel = () => {
    return (
        <div
            id="carouselExampleCaptions"
            className={`carousel slide ${styles.carouselContainer}`}
            data-bs-ride="carousel"
        >
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="assets/banner_img1.png"
                        className="d-block w-100"
                        alt="Slide 1"
                    />
                    <div className={`carousel-caption d-none d-md-block ${styles.overlayContent} ${styles.right}`}>
                        <h5>OnBoard</h5>
                        <h2>SUV OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                </div>

                <div className="carousel-item">
                    <img
                        src="assets/banner_img2.png"
                        className="d-block w-100"
                        alt="Slide 2"
                    />
                    <div className={`carousel-caption d-none d-md-block ${styles.overlayContent} ${styles.left}`}>
                        <h5>OnBoard</h5>
                        <h2>ELECTRIC OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                </div>

                <div className="carousel-item">
                    <img
                        src="assets/banner_img3.png"
                        className="d-block w-100"
                        alt="Slide 3"
                    />
                    <div className={`carousel-caption d-none d-md-block ${styles.overlayContent} ${styles.left}`}>
                        <h5>OnBoard</h5>
                        <h2>SPORT OFFERS</h2>
                        <Link to="#">Rent Now</Link>
                    </div>
                </div>
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carrousel;
