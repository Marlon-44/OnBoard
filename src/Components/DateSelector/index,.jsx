// DateSelector.js
import * as React from 'react';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from "./index.module.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { color } from 'framer-motion';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { BorderColor } from '@mui/icons-material';

export default function BasicDateTimePicker({ text }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label={text}
                className={styles.date__time__picker}
                slotProps={{
                    openPickerButton: {
                        sx: {
                            marginRight: 1,
                            padding: 0,
                            color: "white", // icono del botón
                        },
                    },
                    textField: {
                        InputProps: {
                            sx: {
                                color: "white",           // texto de la fecha
                                borderColor: "white",     // opcional
                            },
                        },
                        InputLabelProps: {
                            sx: {
                                color: "white",           // color del label
                            },
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
} 