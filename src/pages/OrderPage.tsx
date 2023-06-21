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

const OrderPage = () => {
    const { error, data } = useGetOrderQuery();
    
    return (
        <Box>
            <Typography sx={{ textAlign: 'center', mt: 4, fontWeight: 'bold' }}>
                Your orders:
            </Typography>
            {error ? (
                <Typography>{error.errors[0].msg}</Typography>
            ) : data && data.length > 0 ? (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    {data.map((order) => (
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                            key={order.id}
                        >
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'lightGray' }}>
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
                                <TableRow sx={{ backgroundColor: '#f2f2f2' }}>
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
                                            {article.name} - {article.gender}
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
            ) : (
                <Typography>No orders</Typography>
            )}
        </Box>
    );
};

export default OrderPage;
