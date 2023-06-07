import React from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    MenuItem,
    Checkbox,
    Input,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import useAuthGuard from '../../hooks/useAuthGuard';
import { ArticleDraft } from '../../types/article.interface';
import { useGetSizesQuery } from '../../queries/sizes.query';
import { useGetColorsQuery } from '../../queries/colors.query';
import { useState, useContext, useEffect } from 'react';
import ArticleService from '../../services/articles.service';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/error.type';
import UserContext from '../../context/User.context';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/static';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CreateArticle = () => {
    const { user } = useContext(UserContext);
    useAuthGuard({ authProtection: true });
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user?.user.isAdmin === false) {
            navigate(ROUTES.HOME);
        }
    }, []);

    const [message, setMessage] = useState('');

    const { error: errorSizes, data: sizes } = useGetSizesQuery();
    const { error: errorColors, data: colors } = useGetColorsQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<ArticleDraft>();

    const formSubmitHandler: SubmitHandler<ArticleDraft> = async (
        data: ArticleDraft
    ) => {
        const formData = new FormData();
        formData.append('imageUrl', data.imageUrl[0]);
        formData.append('name', data.name);
        formData.append('description', data?.description || '');
        formData.append('price', data.price.toString());
        formData.append('inStock', JSON.stringify(data.inStock));
        formData.append('gender', data.gender.toString());
        formData.append('colors', JSON.stringify(data.colors));
        formData.append('sizes', JSON.stringify(data.sizes));

        try {
            await ArticleService.createArticle(formData);
            reset();
            setMessage('Successfuly added new article!');
        } catch (error: unknown) {
            const errorData = error as AxiosError<ErrorResponse>;
            const data = errorData.response?.data;
            if (data) {
                data?.errors.forEach((error) => {
                    setError(error.path as keyof ArticleDraft, {
                        message: error.msg,
                    });
                });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {errorColors || errorSizes ? (<Typography>{errorColors?.errors[0].msg} {errorSizes?.errors[0].msg}</Typography>) : (
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Create Shoe
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
                                label="Name"
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                            />
                            {errors.name?.message && (
                                <span>{errors.name?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-flexible"
                                fullWidth
                                label="Description"
                                multiline
                                maxRows={5}
                                {...register('description', {
                                    required: 'Description is required',
                                })}
                            />
                            {errors.description?.message && (
                                <span>{errors.description?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                type="file"
                                fullWidth
                                {...register('imageUrl')}
                            />
                            {errors.imageUrl?.message && (
                                <span>{errors.imageUrl?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-amount">
                                    Price
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            $
                                        </InputAdornment>
                                    }
                                    label="Price"
                                    {...register('price', {
                                        required: 'Price is required',
                                    })}
                                />
                            </FormControl>
                            {errors.price?.message && (
                                <span>{errors.price?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                        {...register('inStock')}
                                    />
                                }
                                label="In Stock"
                            />
                            {errors.inStock?.message && (
                                <span>{errors.inStock?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    defaultValue={'man'}
                                    id="demo-simple-select"
                                    label="Gender"
                                    {...register('gender', {
                                        required: 'Gender is required',
                                    })}
                                >
                                    <MenuItem value={'man'}>Man</MenuItem>
                                    <MenuItem value={'woman'}>Woman</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.gender?.message && (
                                <span>{errors.gender?.message}</span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: 500 }}>
                                <InputLabel id="colors">Colors</InputLabel>
                                <Select
                                    labelId="colors"
                                    id="colors"
                                    multiple
                                    defaultValue={[]}
                                    input={<OutlinedInput label="Color" />}
                                    MenuProps={MenuProps}
                                    {...register('colors', {
                                        required: 'Color is required',
                                    })}
                                >
                                    {colors?.map((color) => (
                                        <MenuItem
                                            key={color.id}
                                            value={color.id}
                                        >
                                            {color.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.colors?.message && (
                                    <span>{errors.colors?.message}</span>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ width: 500 }}>
                                <InputLabel id="sizes">Size</InputLabel>
                                <Select
                                    labelId="sizes"
                                    id="sizes"
                                    multiple
                                    defaultValue={[]}
                                    input={<OutlinedInput label="Size" />}
                                    MenuProps={MenuProps}
                                    {...register('sizes', {
                                        required: 'Size is required',
                                    })}
                                >
                                    {sizes?.map((size) => (
                                        <MenuItem key={size.id} value={size.id}>
                                            {size.sizeShoe}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.sizes?.message && (
                                    <span>{errors.sizes?.message}</span>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
                {message && (
                    <Typography sx={{ color: 'orange' }}>{message}</Typography>
                )}
            </Box>
            )}
        </Container>
    );
};

export default CreateArticle;
