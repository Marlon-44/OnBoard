import Header from "../../Components/Header";
import styles from "./index.module.css"
import TextField from '@mui/material/TextField';

const Login = () => {
    return (
        <>
            <Header />
            <section className={styles.login__container}>
                <div className={styles.image__section}>

                </div>
                <div className={styles.form__section}>
                    <h1>Log In</h1>
                    <p>Don't Have an Account? <a>Register</a> </p>
                    <TextField
                        label="Email"
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: 'white' }, // Color del label
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Color del texto
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            marginBottom: 2, // opcional para separación
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        InputLabelProps={{
                            style: { color: 'white' }, // Color del label
                        }}
                        InputProps={{
                            style: { color: 'white' }, // Color del texto
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'white',
                                },
                            },
                            marginBottom: 2, // opcional para separación
                        }}
                    />
                    <button className={styles.login__button}>LogIn</button>
                </div>
            </section>
        </>
    )
}

export default Login;