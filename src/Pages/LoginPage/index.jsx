import { useState } from "react";
import Header from "../../Components/Header";
import styles from "./index.module.css";
import TextField from "@mui/material/TextField";
import { Button, Box, Alert } from "@mui/material";
import { loginUsuario } from "../../api/login";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ correo: "", password: "" });
    const [errors, setErrors] = useState({});
    const [alerta, setAlerta] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/homePage";

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
            const respuesta = await loginUsuario(formData);
            localStorage.setItem("usuarioLogueado", JSON.stringify(respuesta));
            setAlerta({ tipo: "success", mensaje: "Inicio exitoso." });

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500); // Tiempo para que se vea el mensaje
        } catch (error) {
            setAlerta({ tipo: "error", mensaje: "Credenciales inválidas." });
        }
    };

    return (
        <>
            <Header />
            <section className={styles.login__container}>
                <div className={styles.image__section}></div>

                <div className={styles.form__section}>
                    <h1>Log In</h1>
                    <p>
                        Don't Have an Account? <a href="#">Register</a>
                    </p>

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
                </div>
            </section>
        </>
    );
};

export default Login;
