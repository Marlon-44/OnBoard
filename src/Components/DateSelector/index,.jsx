// DateSelector.js
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from "./index.module.css"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
export default function DateSelector({text}) {
     return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label={text}
                    sx={{
                        width: {
                            xs: '100%', // móviles
                            sm: '50%',  // tablets
                            md: '30%',  // pantallas medianas
                            lg: '20%'   // pantallas grandes
                        }
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}