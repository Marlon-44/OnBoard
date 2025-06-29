
import styles from "./index.module.css"

const ProfileSection =({usuario})=>{
    return(
        <section className={styles.profile__section}>
            <div className={styles.profile__banner}>
                
            </div>
            <img src={usuario.fotoPerfilUrl} alt="" />
            <h5>{usuario.nombre}</h5>
            <div className={styles.profile__info}>
                <div className={styles.info__row}>
                    <h6>Identificacion</h6>
                    <p>{usuario.idUsuario}</p>
                </div>
                <div className={styles.info__row}>
                    <h6>Correo</h6>
                    <p>{usuario.correo}</p>
                </div>
                <div className={styles.info__row}>
                    <h6>Telefono</h6>
                    <p>{usuario.telefono}</p>
                </div>
                <div className={styles.info__row}>
                    <h6>Direccion</h6>
                    <p>{usuario.direccion}</p>
                </div>
                <div className={styles.info__row}>
                    <h6>Fecha de Registro</h6>
                    <p>{usuario.fechaRegistro}</p>
                </div>
            </div>
        </section>
    )
}

export default ProfileSection;
