import styles from "./index.module.css";
import { motion } from "framer-motion"
const ReviewCard = ({ reviews }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className={styles.review__container}>
            <p> ⭐ ⭐ ⭐ ⭐ ⭐ 5/5</p>
            <h2>{reviews.user} <img src="/assets/verified.svg" alt="" /></h2>
            <p>{reviews.text}</p>
            <h5>Posted on {reviews.date}</h5>
        </motion.div>
    );
};

export default ReviewCard;

