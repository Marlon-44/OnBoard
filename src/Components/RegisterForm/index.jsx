import { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Box } from '@mui/material';
import { registrarUsuario } from '../../api/registro';


const roles = [
    { rol: 'company_owner', label: 'Empresa - Dueña' },
    { rol: 'company_dual', label: 'Empresa - Dueña y Cliente' },
    { rol: 'company_client', label: 'Empresa - Cliente' },
    { rol: 'individual_owner', label: 'Particular - Dueño' },
    { rol: 'individual_client', label: 'Particular - Cliente' },
    { rol: 'individual_dual', label: 'Particular - Dueño y Cliente' },
];

const RegisterForm = () => {
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [rolSeleccionado, setRolSeleccionado] = useState('');
    const [formData, setFormData] = useState({
        idUsuario: '',
        tipoIdentificacion: '',
        nombre: '',
        correo: '',
        password: '',
        telefono: '',
        direccion: '',
        cuentaBancaria: '',
        // extras
        licenciaConduccion: '',
        representante: '',
        documentoRepresentante: '',
        tipoDocumentoRepresentante: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        let data = {
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

        try {
            const res = await registrarUsuario(data);
            alert('Usuario registrado exitosamente');
        } catch (error) {
            console.error(error);
            alert('Error al registrar usuario');
        }
    };

    return (
        <Box  sx={{ maxWidth: 600, margin: 'auto', padding: 4 }} >
            <Typography variant="h4" gutterBottom>Registro de Usuario</Typography>

            <FormControl fullWidth margin="normal">
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

            <FormControl fullWidth margin="normal">
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

            {/* Campos comunes */}
            <TextField label="ID Usuario" name="idUsuario" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Tipo Identificación" name="tipoIdentificacion" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Correo" name="correo" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Contraseña" type="password" name="password" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Teléfono" name="telefono" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Dirección" name="direccion" fullWidth margin="normal" onChange={handleChange} />
            <TextField label="Cuenta Bancaria (opcional)" name="cuentaBancaria" fullWidth margin="normal" onChange={handleChange} />

            {/* Particular */}
            {tipoUsuario === 'particular' && (
                <TextField label="Licencia de Conducción" name="licenciaConduccion" fullWidth margin="normal" onChange={handleChange} />
            )}

            {/* Empresa */}
            {tipoUsuario === 'empresa' && (
                <>
                    <TextField label="Representante Legal" name="representante" fullWidth margin="normal" onChange={handleChange} />
                    <TextField label="Documento del Representante" name="documentoRepresentante" fullWidth margin="normal" onChange={handleChange} />
                    <TextField label="Tipo de Documento del Representante" name="tipoDocumentoRepresentante" fullWidth margin="normal" onChange={handleChange} />
                </>
            )}

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
                Registrar
            </Button>
        </Box>
    );
};

export default RegisterForm;
