import { useState } from "react";
import { useReviews } from "../../features/reviews/ReviewsContext";
import ReviewCard from "../ReviewCard";
import Subtitle from "../Subtitle";
import styles from "./index.module.css";
import { motion, AnimatePresence } from "framer-motion";

const ReviewSection = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);


    const { reviews } = useReviews();
    const INITIAL_COUNT = 4;
    const STEP = 4;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleToggle = () => {
        if (visibleCount >= reviews.length) {
            setVisibleCount(INITIAL_COUNT);
        } else {
            setVisibleCount((prev) => Math.min(prev + STEP, reviews.length));
        }
    };

    const isAllVisible = visibleCount >= reviews.length;

    return (
        <section className={styles.reviews__section}>
            <div className={styles.title__section}>
                <Subtitle text="Rating & Reviews" />
                <button className={styles.dark} onClick={openModal}>Write a Review</button>
            </div>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">Write a Review</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                {/* Aquí puedes poner tu formulario de review */}
                                <p>Tu experiencia con el vehículo:</p>
                                <textarea className="form-control" rows="4" placeholder="Escribe tu reseña aquí..." />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Guardar reseña
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence>
                <div className={styles.reviews__container}>
                    {reviews.slice(0, visibleCount).map((review, index) => (

                        <ReviewCard key={index} reviews={review} />

                    ))}
                </div>
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className={styles.reviews__button}
            >
                {isAllVisible ? "See less" : "See More"}
            </motion.button>

        </section>
    );
};

export default ReviewSection;
