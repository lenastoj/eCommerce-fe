import React from 'react';
import { Article } from '../types/article.interface';

import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Stack,
    ListItem,
    ListItemText,
} from '@mui/material';
import { ROUTES } from '../utils/static';

interface Props {
    article: Article;
}

const SingleArticle = ({ article }: Props) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
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
                    {article.colors && article?.colors?.length > 0 && (
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
                {article.inStock ? (
                    <Typography sx={{ pl: 34, color: 'green' }}>
                        In stock
                    </Typography>
                ) : (
                    <Typography sx={{ pl: 30, color: 'red' }}>
                        Out of stock
                    </Typography>
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
                    <Typography sx={{ pr: 2, fontWeight: 'bold' }}>
                        ${article.price}
                    </Typography>
                </Stack>
            </Card>
        </Grid>
    );
};

export default SingleArticle;
