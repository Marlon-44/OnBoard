
import styles from "./index.module.css"

const ProfileSection =({usuario})=>{
    return(
        <section className={styles.profile__section}>
            <div className={styles.profile__banner}>
                
            </div>
            <img src={usuario.fotoPerfilUrl} alt="" />
            <h5>{usuario.nombre}</h5>
        </section>
    )
}

export default ProfileSection;
