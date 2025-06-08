import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from "./index.module.css"
export default function ComboBox({ array }) {
    return (
        <Autocomplete
            disablePortal
            options={array}
            sx={{
                width: 300,
                color: "white", // color del texto en el input desplegado
                '& .MuiOutlinedInput-root': {
                    color: 'white', // texto del input principal
                    '& fieldset': {
                        borderColor: 'gray',
                    },
                    '&:hover fieldset': {
                        borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
                '& .MuiSvgIcon-root': {
                    color: 'white', // ícono desplegable
                },
                '& .MuiAutocomplete-popupIndicator': {
                    color: 'white', // ícono flecha
                },
                '& .MuiAutocomplete-clearIndicator': {
                    color: 'white', // ícono de limpiar
                },
                '& .MuiAutocomplete-option': {
                    color: 'black', // texto de las opciones
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label=""
                    variant="outlined"
                    
                />
            )}
        />
    );
}
