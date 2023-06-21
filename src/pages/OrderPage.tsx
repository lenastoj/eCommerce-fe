import React from 'react';
import { useGetOrderQuery } from '../queries/order.query';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PaginationComponent from '../components/Pagination';

const OrderPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = Number(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);
    const [totalPages, setTotalPages] = useState(1);

    const { error, data, isLoading, refetch } = useGetOrderQuery();

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
        <Box>
            <Typography sx={{ textAlign: 'center', mt: 4, fontWeight: 'bold' }}>
                Your orders:
            </Typography>
            {error ? (
                <Typography>{error.errors[0].msg}</Typography>
            ) : data && data.data.length > 0 ? (
                <Box>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        {data.data.map((order) => (
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                                key={order.id}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: 'lightGray' }}
                                    >
                                        <TableCell>Order status</TableCell>
                                        <TableCell align="right">
                                            Order date
                                        </TableCell>
                                        <TableCell align="right">
                                            Total price
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={order.id}>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell align="right">
                                            {order.createdAt}
                                        </TableCell>
                                        <TableCell align="right">
                                            ${order.amount / 100}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>

                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: '#f2f2f2' }}
                                    >
                                        <TableCell>Article</TableCell>
                                        <TableCell align="right">
                                            Quantity
                                        </TableCell>
                                        <TableCell align="right">
                                            Single price
                                        </TableCell>
                                        <TableCell align="right">
                                            Total price
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                {article.name} -{' '}
                                                {article.gender}
                                            </TableCell>
                                            <TableCell align="right">
                                                {article.OrderArticle?.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                ${article.price}
                                            </TableCell>
                                            <TableCell align="right">
                                                $
                                                {article.price *
                                                    (article.OrderArticle
                                                        ?.quantity || 1)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ))}
                    </TableContainer>
                    <PaginationComponent
                        setCurrentPage={setCurrentPage}
                        isLoading={isLoading}
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </Box>
            ) : (
                <Typography>No orders</Typography>
            )}
        </Box>
    );
};

export default OrderPage;
