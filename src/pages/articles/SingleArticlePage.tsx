import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
} from '@mui/material';
import { ROUTES } from '../../utils/static';
import ArticleColors from '../../components/ArticleColors';
import ArticleSizes from '../../components/ArticleSizes';
import { useGetArticleQuery } from '../../queries/articles.query';
import CartContext from '../../context/Cart.context';

const SingleArticlePage = () => {
    const { name } = useParams();

    const { addCartArticle } = useContext(CartContext)

    const { error, data: article } = useGetArticleQuery(name || '');
    
    const handleAddToCart = async() => {
        try {
            addCartArticle(article!.id);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            {error ? (
                <Typography>{error.errors[0].msg}</Typography>
            ) : article ? (
                <Card sx={{ display: 'flex', mt: 5 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 400, my: 'auto', mr: 3 }}
                        image={`${ROUTES.IMAGES}${article.imageUrl}`}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                {article.name}
                            </Typography>
                            {article.gender === 'man' ? (
                                <Typography sx={{ pb: 2 }}>
                                    {"Man's running shoes"}
                                </Typography>
                            ) : (
                                <Typography>
                                    {"Woman's running shoes"}
                                </Typography>
                            )}
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {article.description}
                            </Typography>
                        </CardContent>
                        <Stack
                            direction="row"
                            spacing={50}
                            justifyContent="space-between"
                        >
                            <ArticleColors colors={article.colors} />

                            <ArticleSizes sizes={article.sizes} />
                        </Stack>
                        <Stack
                            sx={{ py: 4 }}
                            direction="row"
                            spacing={50}
                            justifyContent="space-between"
                        >
                            <Button
                                size="small"
                                variant="outlined"
                                href={`${ROUTES.SHOES}`}
                                sx={{ ml: 2 }}
                            >
                                Back
                            </Button>
                            <Typography sx={{ pr: 4, fontWeight: 'bold' }}>
                                PRICE -- ${article.price}
                            </Typography>
                        </Stack>
                        {article.inStock ? (
                            <Button onClick={handleAddToCart} variant="contained" sx={{ mb: 2 }}>
                            Add to cart
                        </Button>
                        ) : (
                            <Button variant="outlined" color="error" disabled sx={{ mb: 2, ml: 2, "&.Mui-disabled": {
                                borderColor: "#C2543B",
                                color: "#C2543B",
                              } }}>
                            Out of stock
                        </Button>
                        )}
                        
                            
                       
                    </Box>
                </Card>
            ) : (
                <Typography>No article founded</Typography>
            )}
        </Container>
    );
};

export default SingleArticlePage;
