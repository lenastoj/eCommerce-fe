import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Grid, Typography } from '@mui/material';
import SingleArticle from '../../components/SingleArticle';
import { useGetArticlesQuery } from '../../queries/articles.query';
import PaginationComponent from '../../components/Pagination';
import SortFilter from '../../components/SortFilter';

const ArticlesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageFromURL = Number(searchParams.get('page')) || 1;
    const sortFromURL = searchParams.get('sort') || '';
    const orderByFromURL = searchParams.get('orderBy') || '';
    const sizeFromURL = searchParams.getAll('size') || [];
    const colorFromURL = searchParams.getAll('color') || [];
    const genderFromURL = searchParams.get('gender') || '';

    const [sort, setSort] = useState<string>(sortFromURL);
    const [orderBy, setOrderBy] = useState<string>(orderByFromURL);
    const [size, setSize] = useState<string[]>(
        Array.isArray(sizeFromURL) ? sizeFromURL : [sizeFromURL]
    );
    const [color, setColor] = useState<string[]>(
        Array.isArray(colorFromURL) ? colorFromURL : [colorFromURL]
    );
    const [gender, setGender] = useState<string>(genderFromURL);
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const [totalPages, setTotalPages] = useState(1);

    const { isLoading, error, data, refetch } = useGetArticlesQuery(
        currentPage,
        sort || undefined,
        orderBy || undefined,
        size,
        color,
        gender || undefined
    );

    useEffect(() => {
        if (data) {
            setTotalPages(
                Math.ceil(
                    data?.metadata?.total / data?.metadata?.paginationLimit
                )
            );
        }
    }, [data]);

    useEffect(() => {
        refetch();
        window.scroll(0, 0);

        const searchParamsUrl = new URLSearchParams();
        const params = currentPage.toString();

        sort && searchParamsUrl.set('sort', sort);

        orderBy && searchParamsUrl.set('orderBy', orderBy);

        size &&
            size.length > 0 &&
            size.forEach((value) =>
                searchParamsUrl.append('size', String(value))
            );

        color &&
            color.length > 0 &&
            color.forEach((value) => searchParamsUrl.append('color', value!));

        gender && searchParamsUrl.set('gender', gender);

        setSearchParams(`?page=${params}&${searchParamsUrl.toString()}`);
    }, [currentPage, sort, orderBy, size, color, gender]);

    return (
        <Container sx={{ py: 8 }} maxWidth="lg">
            {error ? (
                <Typography>{error.errors[0].msg}</Typography>
            ) : (
                <Box>
                    <SortFilter
                        sort={sort}
                        setSort={setSort}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        size={size}
                        setSize={setSize}
                        color={color}
                        setColor={setColor}
                        gender={gender}
                        setGender={setGender}
                    />
                    <Grid container spacing={4}>
                        {data?.data ? (
                            data.data.map((article) => (
                                <SingleArticle
                                    key={article.id}
                                    article={article}
                                />
                            ))
                        ) : (
                            <Typography>No articles</Typography>
                        )}
                    </Grid>

                    <PaginationComponent
                        setCurrentPage={setCurrentPage}
                        isLoading={isLoading}
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </Box>
            )}
        </Container>
    );
};

export default ArticlesPage;
