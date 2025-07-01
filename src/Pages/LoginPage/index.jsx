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
            guardarSesion(respuesta);
            setAlerta({ tipo: "success", mensaje: "Inicio exitoso." });

            const destino = location.state?.from || "/homePage";
            navigate(destino, { replace: true });
        } catch (error) {
            console.error("Error en login:", error);
            setAlerta({ tipo: "error", mensaje: "Credenciales inválidas o error de servidor." });
        }
    };

    return (
        <>
            <Header />
            <section className={styles.login__container}>
                <div className={styles.image__section}>

                </div>

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
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                            },
                            marginBottom: 2,
                        }}
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
                        InputLabelProps={{ style: { color: "white" } }}
                        InputProps={{ style: { color: "white" } }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                            },
                            marginBottom: 2,
                        }}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        className={styles.login__button}
                    >
                        Log In
                    </Button>
                    <p>
                        Don't Have an Account? <Link to="/register" >Register</Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default Login;
