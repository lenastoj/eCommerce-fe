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
import ArticleColors from '../../components/ArticleColors';
import ArticleSizes from '../../components/ArticleSizes';
import { useGetArticleQuery } from '../../queries/articles.query';

const SingleArticlePage = () => {
    const { name } = useParams();

    const {
        isLoading,
        error,
        data: article,
    } = useGetArticleQuery(name || '');

    useEffect(() => {
        console.log(article)
    },[article])

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
                            <ArticleColors colors={article.colors} />

                            <ArticleSizes sizes={article.sizes} />
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
