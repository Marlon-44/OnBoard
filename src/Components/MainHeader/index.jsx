import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { motion } from "framer-motion";
import Search from "../Search";
import { useContext, useState } from "react";
import SesionContext from "../../features/sesion/SesionContext";

// MUI
import { Menu, MenuItem, Avatar } from "@mui/material";

const MainHeader = () => {
    const { usuario, cerrarSesion } = useContext(SesionContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickAvatar = (event) => {
        console.log("USAURIO: ", usuario)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCerrarSesion = () => {
        cerrarSesion();
        handleClose();
        navigate("/");
    };

    const handleVerPerfil = () => {
        handleClose();
        navigate("/profile"); // Asegúrate de tener esta ruta configurada
    };

    const handleLogin = () => {
        handleClose();
        navigate("/login");
    };

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={styles.header__container}
        >
            <div className={styles.header__up__section}>
                <div className={styles.logo__account__box}>
                    <h2>OnBoard</h2>

                    {/* Avatar + menú */}
                    <Avatar
                        src={usuario?.fotoPerfilUrl || "/assets/icon__user__black.png"}
                        alt="Usuario"
                        onClick={handleClickAvatar}
                        sx={{
                            width: 40,
                            height: 40,
                            cursor: "pointer"
                        }}
                    />

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        disableAutoFocusItem
                    >
                        {usuario
                            ? [
                                <MenuItem key="perfil" onClick={handleVerPerfil}>Ver perfil</MenuItem>,
                                <MenuItem key="cerrar" onClick={handleCerrarSesion}>Cerrar sesión</MenuItem>
                            ]
                            : [<MenuItem key="login" onClick={handleLogin}>Iniciar sesión</MenuItem>]
                        }

                    </Menu>
                </div>

                <Search />
            </div>

            <div className={styles.header__down__section}>
                <div className={styles.hd__button__container}>
                    <button>Cars</button>
                    <button>Bikes</button>
                    <button>Yatches</button>
                    <button>Sport</button>
                    <button>SUV</button>
                    <button>Sedan</button>
                    <button>Van</button>
                </div>
            </div>
        </motion.header>
    );
};

export default MainHeader;
