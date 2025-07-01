import { useState } from 'react';
import Header from '../../Components/Header';
import styles from './index.module.css';
import { Alert } from '@mui/material';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Box,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registrarUsuario } from '../../api/registro';
import { Link, useNavigate } from 'react-router-dom';
import { style } from 'framer-motion/client';

const roles = [
    { idRol: 'company_owner', label: 'Empresa - Dueña' },
    { idRol: 'company_dual', label: 'Empresa - Dueña y Cliente' },
    { idRol: 'company_client', label: 'Empresa - Cliente' },
    { idRol: 'individual_owner', label: 'Particular - Dueño' },
    { idRol: 'individual_client', label: 'Particular - Cliente' },
    { idRol: 'individual_dual', label: 'Particular - Dueño y Cliente' },
];

const tipoIdLabels = {
    CC: 'Cédula',
    CE: 'Cédula de Extranjería',
    PASAPORTE: 'Pasaporte',
    NIT: 'NIT',
};

const estilosInput = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: '#c9c9c9' },
        '&:hover fieldset': { borderColor: '#c9c9c9' },
        '&.Mui-focused fieldset': { borderColor: '#c9c9c9' },
    },
    '& .MuiInputLabel-root': { color: '#000' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
    input: { color: '#000' },
};

const Register = () => {
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [rolSeleccionado, setRolSeleccionado] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        idUsuario: '',
        tipoIdentificacion: '',
        nombre: '',
        correo: '',
        confirmarCorreo: '',
        password: '',
        confirmarPassword: '',
        telefono: '',
        direccion: '',
        cuentaBancaria: '',
        licenciaConduccion: '',
        representante: '',
        documentoRepresentante: '',
        tipoDocumentoRepresentante: '',
    });
    const estilosInput = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#c9c9c9' },
            '&:hover fieldset': { borderColor: '#c9c9c9' },
            '&.Mui-focused fieldset': { borderColor: '#c9c9c9' },
        },
        '& .MuiInputLabel-root': { color: '#000' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#000' },
        input: { color: '#000' },
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'idUsuario':
            case 'telefono':
                if (!/^\d+$/.test(value)) error = 'Solo se permiten números';
                break;

            case 'nombre':
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(value))
                    error = 'Solo letras y espacios';
                break;

            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    error = 'Correo inválido';
                else if (value !== formData.confirmarCorreo)
                    error = 'Los correos no coinciden';
                break;

            case 'confirmarCorreo':
                if (value !== formData.correo)
                    error = 'Los correos no coinciden';
                break;

            case 'password':
                if (!value) error = 'La contraseña no puede estar vacía';
                else if (value !== formData.confirmarPassword)
                    error = 'Las contraseñas no coinciden';
                break;

            case 'confirmarPassword':
                if (value !== formData.password)
                    error = 'Las contraseñas no coinciden';
                break;
            case 'representante':
            case 'documentoRepresentante':
            case 'tipoDocumentoRepresentante':
                if (!value.trim()) error = 'Este campo es obligatorio';
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };
    const validarTodo = () => {
        let esValido = true;
        const nuevosErrores = {};

        for (const [name, value] of Object.entries(formData)) {
            let error = '';

            switch (name) {
                case 'idUsuario':
                case 'telefono':
                    if (!/^\d+$/.test(value))
                        error = 'Solo se permiten números';
                    break;
                case 'nombre':
                    if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(value))
                        error = 'Solo letras y espacios';
                    break;
                case 'correo':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                        error = 'Correo inválido';
                    else if (value !== formData.confirmarCorreo)
                        error = 'Los correos no coinciden';
                    break;
                case 'confirmarCorreo':
                    if (value !== formData.correo)
                        error = 'Los correos no coinciden';
                    break;
                case 'password':
                    if (!value) error = 'La contraseña no puede estar vacía';
                    else if (value !== formData.confirmarPassword)
                        error = 'Las contraseñas no coinciden';
                    break;
                case 'confirmarPassword':
                    if (value !== formData.password)
                        error = 'Las contraseñas no coinciden';
                    break;
                case 'direccion':
                    break;
                case 'cuentaBancaria':
                    // es opcional, pero si se llena, debe tener formato válido (puedes agregar validación si quieres)
                    break;
                case 'licenciaConduccion':
                    break;
                case 'representante':
                case 'documentoRepresentante':
                case 'tipoDocumentoRepresentante':
                    if (tipoUsuario === 'empresa' && !value.trim())
                        error = 'Este campo es obligatorio';
                    break;
            }

            if (error) {
                nuevosErrores[name] = error;
                esValido = false;
            }
        }

        setErrors(nuevosErrores);
        return esValido;
    };

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = () => { };
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

    const handleSubmit = async () => {
        if (!validarTodo()) {
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor corrige los errores antes de continuar.',
            });
            return;
        }

        const data = {
            usuario: {
                idUsuario: formData.idUsuario,
                tipoIdentificacion: formData.tipoIdentificacion,
                nombre: formData.nombre,
                correo: formData.correo,
                password: formData.password,
                telefono: formData.telefono,
                direccion: formData.direccion,
                cuentaBancaria: formData.cuentaBancaria || undefined,
                idRol: rolSeleccionado,
            },
        };

        if (tipoUsuario === 'particular') {
            data.particular = {
                licenciaConduccion: formData.licenciaConduccion,
            };
        } else if (tipoUsuario === 'empresa') {
            data.empresa = {
                representante: formData.representante,
                documentoRepresentante: formData.documentoRepresentante,
                tipoDocumentoRepresentante: formData.tipoDocumentoRepresentante,
            };
        }

        try {
            await registrarUsuario(data);
            setAlerta({
                tipo: 'success',
                mensaje: 'Usuario registrado exitosamente.',
            });
            setFormData({
                idUsuario: '',
                tipoIdentificacion: '',
                nombre: '',
                correo: '',
                confirmarCorreo: '',
                password: '',
                confirmarPassword: '',
                telefono: '',
                direccion: '',
                cuentaBancaria: '',
                licenciaConduccion: '',
                representante: '',
                documentoRepresentante: '',
                tipoDocumentoRepresentante: '',
            });
            setErrors({});
            setTipoUsuario('');
            setRolSeleccionado('');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setAlerta({
                tipo: 'error',
                mensaje:
                    'Ocurrió un error al registrar el usuario. Inténtalo de nuevo.',
            });
            console.error('Error al registrar usuario:', error);
        }
    };
    const navigate = useNavigate();
    const handleNav = () => {
        navigate("/homePage")
    }
    return (
        <div className='login__page'>
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

                <div className={styles.form__section} >
                    <h1>Registrate en nuestra plataforma</h1>

                    <FormControl fullWidth margin="normal" sx={estilosInput}>
                        <InputLabel>Tipo de Usuario</InputLabel>
                        <Select
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value)}
                            label="Tipo de Usuario"
                            sx={{ ...estilosInput, color: '#000' }}
                        >
                            <MenuItem value="particular">Particular</MenuItem>
                            <MenuItem value="empresa">Empresa</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" sx={estilosInput}>
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={rolSeleccionado}
                            onChange={(e) => setRolSeleccionado(e.target.value)}
                            label="Rol"
                            sx={{ ...estilosInput, color: '000' }}
                        >
                            {roles.map((rol) => (
                                <MenuItem key={rol.idRol} value={rol.idRol}>
                                    {rol.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Tipo de identificación */}
                    <FormControl fullWidth margin="normal" sx={estilosInput}>
                        <InputLabel>Tipo de Identificación</InputLabel>
                        <Select
                            name="tipoIdentificacion"
                            value={formData.tipoIdentificacion}
                            onChange={handleChange}
                            label="Tipo de Identificación"
                            sx={{ ...estilosInput, color: '#000' }}
                        >
                            <MenuItem value="CC">CC</MenuItem>
                            <MenuItem value="CE">CE</MenuItem>
                            <MenuItem value="PASAPORTE">PASAPORTE</MenuItem>
                            <MenuItem value="NIT">NIT</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ID Usuario con label dinámico */}
                    <div className={styles.double__input__box}>
                        <TextField
                            label={
                                tipoIdLabels[formData.tipoIdentificacion] ||
                                'Identificación'
                            }
                            name="idUsuario"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            error={!!errors.idUsuario}
                            helperText={errors.idUsuario}
                            sx={estilosInput}
                        />

                        {/* Resto de campos comunes */}
                        <TextField
                            label="Nombre"
                            name="nombre"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            sx={estilosInput}
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                        />
                    </div>

                    <div className={styles.double__input__box}>
                        <TextField
                            label="Correo"
                            name="correo"
                            fullWidth
                            margin="normal"
                            value={formData.correo}
                            onChange={handleChange}
                            error={!!errors.correo}
                            helperText={errors.correo}
                            sx={estilosInput}
                        />

                        <TextField
                            label="Confirmar Correo"
                            name="confirmarCorreo"
                            fullWidth
                            margin="normal"
                            value={formData.confirmarCorreo}
                            onChange={handleChange}
                            error={!!errors.confirmarCorreo}
                            helperText={errors.confirmarCorreo}
                            sx={estilosInput}
                        />
                    </div>

                    <div className={styles.double__input__box}>
                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={estilosInput}
                        >

                            <InputLabel htmlFor="outlined-password">
                                Contraseña
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff
                                                    sx={{ color: '#000' }}
                                                />
                                            ) : (
                                                <Visibility
                                                    sx={{ color: '#000' }}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                            />
                            {errors.password && (
                                <Typography color="error" fontSize="0.75rem">
                                    {errors.password}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            sx={estilosInput}
                        >
                            <InputLabel htmlFor="confirmar-password">
                                Confirmar Contraseña
                            </InputLabel>
                            <OutlinedInput
                                id="confirmar-password"
                                name="confirmarPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmarPassword}
                                onChange={handleChange}
                                error={!!errors.confirmarPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff
                                                    sx={{ color: '#000' }}
                                                />
                                            ) : (
                                                <Visibility
                                                    sx={{ color: '#000' }}
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirmar Contraseña"
                            />
                            {errors.confirmarPassword && (
                                <Typography color="error" fontSize="0.75rem">
                                    {errors.confirmarPassword}
                                </Typography>
                            )}
                        </FormControl>
                    </div>
                    {/* Contraseña con visibilidad */}


                    <TextField
                        label="Teléfono"
                        name="telefono"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.telefono}
                        helperText={errors.telefono}
                        sx={estilosInput}
                    />
                    <TextField
                        label="Dirección"
                        name="direccion"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.direccion}
                        helperText={errors.direccion}
                        sx={estilosInput}
                    />
                    <TextField
                        label="Cuenta Bancaria (opcional)"
                        name="cuentaBancaria"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        error={!!errors.cuentaBancaria}
                        helperText={errors.cuentaBancaria}
                        sx={estilosInput}
                    />

                    {tipoUsuario === 'particular' && (
                        <TextField
                            label="Licencia de Conducción"
                            name="licenciaConduccion"
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            error={!!errors.licenciaConduccion}
                            helperText={errors.licenciaConduccion}
                            sx={estilosInput}
                        />
                    )}

                    {tipoUsuario === 'empresa' && (
                        <>
                            <TextField
                                label="Representante Legal"
                                name="representante"
                                fullWidth
                                margin="normal"
                                onChange={handleChange}
                                error={!!errors.representante}
                                helperText={errors.representante}
                                sx={estilosInput}
                            />
                            <div className={styles.double__input__box}>
                                <TextField
                                    label="Tipo de Documento del Representante"
                                    name="tipoDocumentoRepresentante"
                                    fullWidth
                                    margin="normal"
                                    onChange={handleChange}
                                    error={!!errors.tipoDocumentoRepresentante}
                                    helperText={errors.tipoDocumentoRepresentante}
                                    sx={estilosInput}
                                />
                                <TextField
                                    label="Documento del Representante"
                                    name="documentoRepresentante"
                                    fullWidth
                                    margin="normal"
                                    onChange={handleChange}
                                    error={!!errors.documentoRepresentante}
                                    helperText={errors.documentoRepresentante}
                                    sx={estilosInput}
                                />
                            </div>

                        </>
                    )}
                    {alerta.mensaje && (
                        <Alert severity={alerta.tipo} sx={{ mt: 2 }}>
                            {alerta.mensaje}
                        </Alert>
                    )}

                    <button
                        className={styles.login__button}
                        onClick={handleSubmit}
                    >
                        Registrar
                    </button>
                    <p style={{ marginTop: "1rem" }}>
                        ¿Ya estas en OnBoard? <Link to="/login" style={{ textDecoration: "none", color: "#4431b3", fontWeight: "600" }}>Inicia sesion.</Link>
                    </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems:"flex-start", marginTop:"1rem"}}>
                    <img style={{width:"3.5%", margin:0, paddingTop:"0.1rem"}} src="/assets/lock.svg" alt="" />
                    <p style={{margin:"0px", padding:"0px", color:"#b4b4b4"}}>Por tu seguridad, nunca compartas tus credenciales de acceso usuario, contraseña o tokens con nadie.</p>
                </div>
            </section>
        </div>
    );
};

export default Register;
