import { useState } from 'react';
import Header from "../../Components/Header";
import styles from "./index.module.css";
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
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registrarUsuario } from '../../api/registro';

const roles = [
    { rol: 'company_owner', label: 'Empresa - Dueña' },
    { rol: 'company_dual', label: 'Empresa - Dueña y Cliente' },
    { rol: 'company_client', label: 'Empresa - Cliente' },
    { rol: 'individual_owner', label: 'Particular - Dueño' },
    { rol: 'individual_client', label: 'Particular - Cliente' },
    { rol: 'individual_dual', label: 'Particular - Dueño y Cliente' },
];

const tipoIdLabels = {
    CC: 'Cédula',
    CE: 'Cédula de Extranjería',
    PASAPORTE: 'Pasaporte',
    NIT: 'NIT'
};

const estilosInput = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'white' },
        '&:hover fieldset': { borderColor: 'white' },
        '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
    input: { color: 'white' },
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
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
            '& svg': { color: 'white' }, // <-- icono desplegable blanco
        },
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
        input: { color: 'white' },
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'idUsuario':
            case 'telefono':
                if (!/^\d+$/.test(value)) error = 'Solo se permiten números';
                break;

            case 'nombre':
                if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(value)) error = 'Solo letras y espacios';
                break;

            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Correo inválido';
                else if (value !== formData.confirmarCorreo) error = 'Los correos no coinciden';
                break;

            case 'confirmarCorreo':
                if (value !== formData.correo) error = 'Los correos no coinciden';
                break;

            case 'password':
                if (value !== formData.confirmarPassword) error = 'Las contraseñas no coinciden';
                break;

            case 'confirmarPassword':
                if (value !== formData.password) error = 'Las contraseñas no coinciden';
                break;

            case 'direccion':
            case 'cuentaBancaria':
            case 'licenciaConduccion':
            case 'representante':
            case 'documentoRepresentante':
            case 'tipoDocumentoRepresentante':
                if (!value.trim()) error = 'Este campo es obligatorio';
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = () => { };

    const handleSubmit = () => {
        // Construimos el JSON como si lo fueras a enviar
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
                rol: rolSeleccionado
            }
        };

        if (tipoUsuario === 'particular') {
            data.particular = {
                licenciaConduccion: formData.licenciaConduccion
            };
        } else if (tipoUsuario === 'empresa') {
            data.empresa = {
                representante: formData.representante,
                documentoRepresentante: formData.documentoRepresentante,
                tipoDocumentoRepresentante: formData.tipoDocumentoRepresentante
            };
        }

        // Mostramos el JSON en consola en lugar de enviarlo
        console.log('JSON generado para prueba:', JSON.stringify(data, null, 2));
        alert('Formulario simulado enviado. Revisa la consola.');
    };


    return (
        <>
            <Header />
            <section className={styles.login__container}>
                <div className={styles.image__section}>

                </div>

                <Box className={styles.form__section} sx={{ maxWidth: 600 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>Registro de Usuario</Typography>

                    <FormControl fullWidth margin="normal" sx={estilosInput}>
                        <InputLabel>Tipo de Usuario</InputLabel>
                        <Select
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value)}
                            label="Tipo de Usuario"
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
                        >
                            {roles.map((rol) => (
                                <MenuItem key={rol.rol} value={rol.rol}>{rol.label}</MenuItem>
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
                        >
                            <MenuItem value="CC">CC</MenuItem>
                            <MenuItem value="CE">CE</MenuItem>
                            <MenuItem value="PASAPORTE">PASAPORTE</MenuItem>
                            <MenuItem value="NIT">NIT</MenuItem>
                        </Select>
                    </FormControl>

                    {/* ID Usuario con label dinámico */}
                    <TextField
                        label={tipoIdLabels[formData.tipoIdentificacion] || "Identificación"}
                        name="idUsuario"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        sx={estilosInput}
                    />

                    {/* Resto de campos comunes */}
                    <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
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
                    {/* Contraseña con visibilidad */}
                    <FormControl fullWidth margin="normal" variant="outlined" sx={estilosInput}>
                        <InputLabel htmlFor="outlined-password">Contraseña</InputLabel>
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
                                        {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                        />
                        {errors.password && (
                            <Typography color="error" fontSize="0.75rem">{errors.password}</Typography>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined" sx={estilosInput}>
                        <InputLabel htmlFor="confirmar-password">Confirmar Contraseña</InputLabel>
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
                                        {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirmar Contraseña"
                        />
                        {errors.confirmarPassword && (
                            <Typography color="error" fontSize="0.75rem">{errors.confirmarPassword}</Typography>
                        )}
                    </FormControl>

                    <TextField label="Teléfono" name="telefono" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                    <TextField label="Dirección" name="direccion" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                    <TextField label="Cuenta Bancaria (opcional)" name="cuentaBancaria" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />

                    {tipoUsuario === 'particular' && (
                        <TextField label="Licencia de Conducción" name="licenciaConduccion" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                    )}

                    {tipoUsuario === 'empresa' && (
                        <>
                            <TextField label="Representante Legal" name="representante" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                            <TextField label="Documento del Representante" name="documentoRepresentante" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                            <TextField label="Tipo de Documento del Representante" name="tipoDocumentoRepresentante" fullWidth margin="normal" onChange={handleChange} sx={estilosInput} />
                        </>
                    )}

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
                        Registrar
                    </Button>
                </Box>
            </section>
        </>
    );
};

export default Register;
