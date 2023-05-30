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
import authService from '../../services/auth.service';
import { RegisterValues } from '../../types/register.type';
import { useContext } from 'react';
import { ErrorRegister } from '../../types/error.type';
import { AxiosError } from 'axios';
import UserContext from '../../context/User.context';
import useAuthGuard from '../../hooks/useAuthGuard';

const Register = () => {
    useAuthGuard({ authProtection: false });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<RegisterValues>();

    const { login } = useContext(UserContext);

    const formSubmitHandler: SubmitHandler<RegisterValues> = async (
        data: RegisterValues
    ) => {
        try {
            const response = await authService.register(data);
            const user = response.data;
            if (user) {
                login(user);
            }
        } catch (error: unknown) {
            const errorData = error as AxiosError<ErrorRegister>;
            const data = errorData.response?.data;
            if (data) {
                data.errors.forEach((error) => {
                    setError(error.path as keyof RegisterValues, {
                        message: error.msg,
                    });
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
                    Register
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(formSubmitHandler)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First name"
                                {...register('firstName', {
                                    required: 'First name is required',
                                })}
                            />
                            {errors.firstName?.message && (
                                <span>{errors.firstName?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                {...register('lastName', {
                                    required: 'Last name is required',
                                })}
                            />
                            {errors.lastName?.message && (
                                <span>{errors.lastName?.message}</span>
                            )}
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password confirmation"
                                type="password"
                                {...register('passwordConfirmation', {
                                    required: 'Confirmation is required',
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return 'Passwords do not match';
                                        }
                                    },
                                })}
                            />
                            {errors.passwordConfirmation?.message && (
                                <span>
                                    {errors.passwordConfirmation?.message}
                                </span>
                            )}
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="space-around">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
