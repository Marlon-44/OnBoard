import styles from "./index.module.css"

const Footer =()=>{
    return(
        <footer className={styles.footer__container}>
            <section className={styles.footer__section}>
                <ul className={styles.footer__list}>
                    <h3>Get In Touch</h3>
                    <li className={styles.footer__list__item}>Contact us to provide you the best service</li>
                    <div className={styles.footer__media__box}>
                        <img src="assets/whatsapp__icon.svg" alt="" />
                        <img src="assets/telegram__icon.svg" alt="" />
                        <img src="assets/instagram__icon.svg" alt="" />
                    </div>
                </ul>
                <ul className={styles.footer__list}>
                    <h3>Company Info</h3>
                    <li className={styles.footer__list__item}>About Us</li>
                    <li className={styles.footer__list__item}>Carrier</li>
                    <li className={styles.footer__list__item}>We are hiring</li>
                    <li className={styles.footer__list__item}>Blog</li>
                </ul>
                <ul className={styles.footer__list}>
                    <h3>Features</h3>
                    <li className={styles.footer__list__item}>Sport Cars</li>
                    <li className={styles.footer__list__item}>SUV</li>
                    <li className={styles.footer__list__item}>Yathces</li>
                    <li className={styles.footer__list__item}>Bikes</li>
                </ul>
                <ul className={styles.footer__list}>
                    <h3>Resorces</h3>
                    <li className={styles.footer__list__item}>IOS & android</li>
                    <li className={styles.footer__list__item}>Watch a demo</li>
                    <li className={styles.footer__list__item}>Customers</li>
                    <li className={styles.footer__list__item}>Api</li>
                </ul>
            </section>
            <div className={styles.footer__rights__info}>
                <p>Made By Elevate Enterprise All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer;