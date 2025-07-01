import { useContext, useState } from "react";
import Header from "../../Components/Header";
import styles from "./index.module.css";
import TextField from "@mui/material/TextField";
import { Button, Box, Alert } from "@mui/material";
import { loginUsuario } from "../../api/login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SesionContext from "../../features/sesion/SesionContext";
import { UserContext } from "../../features/users/UserContext";

const Login = () => {
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [errors, setErrors] = useState({});
    const [alerta, setAlerta] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/homePage";
    const { guardarSesion } = useContext(SesionContext);
    const { users } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";

        if (name === "correo") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error = "Correo inválido";
            }
        }

        if (name === "password" && !value.trim()) {
            error = "La contraseña no puede estar vacía";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const validarTodo = () => {
        const nuevosErrores = {};
        let esValido = true;

        if (!formData.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
            nuevosErrores.correo = "Correo inválido";
            esValido = false;
        }

        if (!formData.password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria";
            esValido = false;
        }

        setErrors(nuevosErrores);
        return esValido;
    };

    const handleSubmit = async () => {
        if (!validarTodo()) {
            setAlerta({ tipo: "error", mensaje: "Corrige los errores." });
            return;
        }

        try {
            const credenciales = {
                correo: formData.correo,
                password: formData.password
            };

            console.log("Enviando:", credenciales);

            const respuesta = await loginUsuario(credenciales);
            if (respuesta.estadoVerificacion === "PENDIENTE") {
                setAlerta({
                    tipo: "warning",
                    mensaje: "Tu cuenta aún no ha sido verificada. Por favor, inténtalo de nuevo en 10 minutos."
                });
                return;
            }

            guardarSesion(respuesta);
            setAlerta({ tipo: "success", mensaje: "Inicio exitoso." });

            const destino = location.state?.from || "/homePage";
            navigate(destino, { replace: true });

        } catch (error) {
            console.error("Error en login:", error);
            setAlerta({ tipo: "error", mensaje: "Credenciales inválidas o cuenta por verificar" });
            
        }
    };

    const handleNav = () => {
        navigate("/homePage")
    }
    return (
        <div className={styles.login__page}>
            <div style={{ position: "absolute", width: "auto" }}
                className={styles.logo__container}
                onClick={handleNav}>
                <h2 style={{
                    color: "#fff",
                    fontFamily: "Montserrat",
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    padding: "1rem",
                    paddingLeft: "4rem"
                }} >OnBoard</h2>
            </div>
            <div className={styles.image__section}>

            </div>
            <section className={styles.login__container}>


                <div className={styles.form__section}>
                    <h1>Inicia sesion en tu cuenta</h1>


                    {alerta && (
                        <Alert severity={alerta.tipo} sx={{ mb: 2 }}>
                            {alerta.mensaje}
                        </Alert>
                    )}

                    <TextField
                        label="Email"
                        variant="outlined"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        error={!!errors.correo}
                        helperText={errors.correo}

                        fullWidth
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}


                        fullWidth
                    />
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input name="remember" type="checkbox"></input>
                        <label style={{ fontSize: "0.8rem" }} htmlFor="remember">Recordarme en este dispositivo</label>

                    </div>
                    <button

                        fullWidth
                        onClick={handleSubmit}
                        className={styles.login__button}
                    >
                        Iniciar Sesion
                    </button>

                    <hr />

                    <button

                        fullWidth
                        onClick={handleSubmit}
                        className={styles.loginWith__button}

                    >
                        <img className={styles.button__icon} src="./assets/google.svg" alt="" /> Inicia sesion con Google
                    </button>
                    <button

                        fullWidth
                        onClick={""}
                        className={styles.loginWith__button}
                    >
                        <img className={styles.button__icon} src="/assets/outlook.svg" alt="" />
                        Inicia sesion con Outlook
                    </button>

                    <p >
                        ¿Eres nuevo en OnBoard? <Link to="/register" style={{ textDecoration: "none", color: "#4431b3", fontWeight: "600" }}>Crea una cuenta</Link>
                    </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <img style={{ width: "3.5%", margin: 0, paddingTop: "0.1rem" }} src="/assets/lock.svg" alt="" />
                    <p style={{ margin: "0px", padding: "0px", color: "#b4b4b4" }}>Por tu seguridad, nunca compartas tus credenciales de acceso usuario, contraseña o tokens con nadie.</p>
                </div>
            </section>
        </div>
    );
};

export default Login;
