import React, { useContext } from 'react';
import CartContext from '../context/Cart.context';
import {
    Alert,
    Button,
    Grid,
    Box,
    Card,
    CardMedia,
    Container,
    CardContent,
    Typography,
    ListItem,
    ListItemText,
    Stack,
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/static';
import { useState } from 'react';

const CartPage = () => {
    const { cart, changeQuntity, removeArticle, removeArticles, totalPrice } =
        useContext(CartContext);

    const [newQuantity, setNewQuantity] = useState<any>();

    const handleChangeQuantity = (
        articleId: number,
        quantity: string | (number | undefined)[]
    ) => {
        changeQuntity(articleId, Number(quantity));
    };

    return cart && cart.articles?.length > 0 ? (
        <Container sx={{ py: 8 }} maxWidth="lg">
            <Box>
                <Grid
                    container
                    spacing={4}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    {cart?.articles?.map((article) => (
                        <Grid item xs={12} sm={6} md={4} key={article.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '56.25%',
                                    }}
                                    image={`${ROUTES.IMAGES}${article.imageUrl}`}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                        sx={{
                                            borderTop: (theme) =>
                                                `1px solid ${theme.palette.divider}`,
                                        }}
                                    >
                                        {article.name}
                                    </Typography>
                                    {article.colors && article?.colors?.length > 0 ? (
                                        <ListItem sx={{ display: 'table-row' }}>
                                            {article.colors.map((color) => (
                                                <ListItemText
                                                    key={color.id}
                                                    primary={color.name}
                                                    sx={{
                                                        display: 'list-item',
                                                        ml: 2,
                                                    }}
                                                />
                                            ))}
                                        </ListItem>
                                    ) : (
                                        <ListItem
                                            sx={{
                                                display: 'table-row',
                                                color: '#C2543B',
                                            }}
                                        >
                                            <ListItemText
                                                key={0}
                                                primary="no color"
                                                sx={{
                                                    display: 'list-item',
                                                    ml: 2,
                                                }}
                                            />
                                        </ListItem>
                                    )}

                                    <Stack
                                        sx={{ pt: 1 }}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Button
                                            size="small"
                                            href={`${ROUTES.SHOES}/${article.name}`}
                                        >
                                            View
                                        </Button>
                                        <Typography
                                            sx={{ pr: 2, fontWeight: 'bold' }}
                                        >
                                            PRICE -- $
                                            {article.price *
                                                article.CartArticle!.quantity}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        sx={{ pt: 1 }}
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-between"
                                    >
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => {
                                                removeArticle(article.id);
                                            }}
                                        >
                                            Remove
                                        </Button>
                                        <Grid item xs={5}>
                                            <FormControl
                                                sx={{ width: 120, mr: 5 }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-amount">
                                                        Quantity
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        type="number"
                                                        id="outlined-adornment-amount"
                                                        label="Quantity"
                                                        defaultValue={
                                                            article.CartArticle
                                                                ?.quantity
                                                        }
                                                        onChange={(e) =>
                                                            setNewQuantity(
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <Button
                                                        onClick={() =>
                                                            handleChangeQuantity(
                                                                article.id,
                                                                newQuantity
                                                            )
                                                        }
                                                    >
                                                        Change
                                                    </Button>
                                                </FormControl>
                                            </FormControl>
                                        </Grid>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Stack
                    sx={{
                        pt: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 5,
                    }}
                    direction="row"
                    spacing={2}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => removeArticles()}
                    >
                        Remove all articles
                    </Button>
                    <Button size="small" variant="outlined" color="success">
                        Checkout ${totalPrice}
                    </Button>
                </Stack>
            </Box>
        </Container>
    ) : (
        <Alert>
            Cart is empty. Visit our <Link to={ROUTES.SHOES}>shop page</Link>
        </Alert>
    );
};

export default CartPage;
