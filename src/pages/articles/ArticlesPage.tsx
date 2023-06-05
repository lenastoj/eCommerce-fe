import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import SingleArticle from '../../components/SingleArticle';
import { useGetArticlesQuery } from '../../queries/articles.query';
import PaginationComponent from '../../components/Pagination';

const ArticlesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = Number(searchParams.get('page')) || 1;

    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const [totalPages, setTotalPages] = useState(1);

    const { isLoading, error, data, refetch } =
        useGetArticlesQuery(currentPage);

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

        const params = currentPage.toString();
        setSearchParams(`?page=${params}`);
    }, [currentPage]);


    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {data?.data?.map((article) => (
                    <SingleArticle key={article.id} article={article} />
                ))}
            </Grid>

            <PaginationComponent
                setCurrentPage={setCurrentPage}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage}
            />
        </Container>
    );
};

export default ArticlesPage;
