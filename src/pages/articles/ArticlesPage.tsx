import React from 'react';
import { useState, useEffect } from 'react';
import {
    Container,
    Grid,
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

import { Articles, Metadata } from '../../types/article.interface';
import articleService from '../../services/articles.service';
import { ROUTES } from '../../utils/static';

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Articles[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [metadata, setMetadata] = useState<Metadata>();

    useEffect(() => {
        const fetchArticles = async () => {
            if (currentPage <= 1) {
                try {
                    const response = await articleService.getAll(
                        currentPage,
                        {}
                    );
                    setArticles(response.data);
                    setMetadata(response.metadata);
                } catch (error) {
                    console.error('Error fetching articles:', error);
                }
            } else {
                try {
                    const response = await articleService.getAll(
                        currentPage,
                        {}
                    );
                    setArticles((prevArray) => [
                        ...prevArray,
                        ...response.data,
                    ]);
                } catch (error) {
                    console.error('Error fetching articles:', error);
                }
            }
        };
        fetchArticles();
    }, [currentPage]);

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    console.log(articles);
    console.log(metadata);

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {articles.map((article) => (
                    <Grid item key={article.name} xs={12} sm={6} md={4}>
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
                                image={article.imageUrl}
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
                                {article.colors.length > 0 && (
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
                                )}
                            </CardContent>
                            <Stack
                                sx={{ pt: 4 }}
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
                                <Typography sx={{ pr: 2, fontWeight: 'bold' }}>
                                    ${article.price}
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {metadata?.total !== articles.length && (
                <Box sx={{ display: 'flex', pt: 4 }} justifyContent="center">
                    <Button variant="contained" onClick={handleLoadMore}>
                        Load more
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default ArticlesPage;
