import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articleService from '../../services/articles.service';
import { Article } from '../../types/article.interface';

import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Stack,
    ListItem,
    ListItemText,
} from '@mui/material';
import { ROUTES } from '../../utils/static';

const SingleArticlePage = () => {
    const [article, setArticle] = useState<Article>();
    const { name } = useParams();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleService.get(name);
                setArticle(response);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, []);

    console.log(article);
    console.log(name);
    return (
        <Container>
            {article ? (
                <Card sx={{ display: 'flex', mt: 5 }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 400, my: 'auto' }}
                        image={article.imageUrl}
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
                            spacing={2}
                            justifyContent="space-between"
                        >
                            {article.colors.length > 0 ? (
                                <ListItem sx={{ display: 'table-row' }}>
                                    <Typography>Available colors:</Typography>
                                    {article.colors.map((color) => (
                                        <ListItemText
                                            key={color.id}
                                            primary={color.name}
                                            sx={{ display: 'list-item', ml: 2 }}
                                        />
                                    ))}
                                </ListItem>
                            ) : (
                                <ListItem sx={{ display: 'table-row' }}>
                                    <Typography>Available sizes:</Typography>

                                    <ListItemText
                                        primary="No available colors"
                                        sx={{ display: 'list-item', ml: 2 }}
                                    />
                                </ListItem>
                            )}
                            {article.sizes.length > 0 ? (
                                <ListItem sx={{ display: 'table-row' }}>
                                    <Typography>Available sizes:</Typography>
                                    {article.sizes.map((size) => (
                                        <ListItemText
                                            key={size.id}
                                            primary={size.sizeShoe}
                                            sx={{ display: 'list-item', ml: 2 }}
                                        />
                                    ))}
                                </ListItem>
                            ) : (
                                <ListItem sx={{ display: 'table-row' }}>
                                    <Typography>Available sizes:</Typography>

                                    <ListItemText
                                        primary="No available sizes"
                                        sx={{ display: 'list-item', ml: 2 }}
                                    />
                                </ListItem>
                            )}
                        </Stack>
                        <Stack
                            sx={{ py: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                        >
                            <Button
                                size="small"
                                variant="outlined"
                                href={`${ROUTES.SHOES}`}
                            >
                                Back
                            </Button>
                            <Typography sx={{ pr: 4, fontWeight: 'bold' }}>
                                ${article.price}
                            </Typography>
                        </Stack>
                    </Box>
                </Card>
            ) : (
                <Typography>No article founded</Typography>
            )}
        </Container>
    );
};

export default SingleArticlePage;
