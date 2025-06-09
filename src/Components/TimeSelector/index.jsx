import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styles from './index.module.css'
export default function TimeSelector() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} >
                <TimePicker label="Basic time picker" className={styles.time__picker}
                sx={{ width: 300,
                    color:"gray",
                    
                        '& .MuiInputLabel-root': {
                            color: 'white', // color del label
                        }
                    }}
                slotProps={{
                        openPickerButton: {
                            sx: {
                                marginRight: 1,
                                padding: 0, 
                            }
                        }
                    }}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
