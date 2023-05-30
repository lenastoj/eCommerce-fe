import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginValues } from '../../types/login.type';
import authService from '../../services/auth.service';
import { ErrorLogin } from '../../types/error.type';
import { AxiosError } from 'axios';
import UserContext from '../../context/User.context';
import { useContext } from 'react';
import useAuthGuard from '../../hooks/useAuthGuard';

const Login = () => {
    useAuthGuard({ authProtection: false });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginValues>();

    const onSubmit: SubmitHandler<LoginValues> = (data) => console.log(data);

    const { login } = useContext(UserContext);

    const formSubmitHandler: SubmitHandler<LoginValues> = async (
        data: LoginValues
    ) => {
        try {
            const response = await authService.login(data);
            const user = response.data;
            if (user) {
                login(user);
            }
        } catch (error: unknown) {
            const errorData = error as AxiosError<ErrorLogin>;
            const data = errorData.response?.data;
            if (data) {
                setError('password', {
                    message: data.errors.message,
                });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(formSubmitHandler)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: 'Please enter a valid email',
                                    },
                                })}
                            />
                            {errors.email?.message && (
                                <span>{errors.email?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                            {errors.password?.message && (
                                <span>{errors.password?.message}</span>
                            )}
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="space-around">
                        <Grid item>
                            <Link href="/register" variant="body2">
                                Do not have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
