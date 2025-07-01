import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from "./index.module.css"
import { text } from 'framer-motion/client';
export default function ComboBox({ array, text}) {
    return (
        <Autocomplete
            disablePortal
            options={array}
            className={styles.combo__box}
            sx={{
                width:"22.5%",
                overflow: "visible",
                color: "white", // color del texto en el input desplegado
                '& .MuiOutlinedInput-root': {
                    color: 'white', // texto del input principal
                    
                },
                '& .MuiSvgIcon-root': {
                    color: 'white', // ícono desplegable
                },
                '& .MuiAutocomplete-popupIndicator': {
                    color: 'white', // ícono flecha
                },
                '& .MuiAutocomplete-clearIndicator': {
                    color: 'white', // ícono de limpiar
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={text}
                    variant="outlined"
                    
                />
            )}
        />
    );
}
