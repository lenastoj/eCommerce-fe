import React from 'react';
import { useGetUserCartQuery } from '../queries/cart.query';
import CartService from '../services/cart.service';
import { Article } from '../types/article.interface';
import { getTotalPriceOfCart } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/static';

const useCart = () => {
    const navigate = useNavigate();

    const { data: cart, refetch } = useGetUserCartQuery();

    const createCart = async () => {
        await CartService.createUserCart();
        refetch();
    };

    const addCartArticle = async (article: Article) => {
        await CartService.addArticleToCart(cart!.id, article.id);
        refetch();
        navigate(ROUTES.SHOES);
    };

    const quantityArticle = async (
        quantity: string | (number | undefined)[],
        articleId: number
    ) => {
        await CartService.quantityArticleCart(quantity, articleId, cart!.id);
        refetch();
    };

    const removeArticle = async (articleId: number) => {
        await CartService.removeArticleFromCart(cart!.id, articleId);
        refetch();
    };

    const removeArticles = async () => {
        await CartService.removeAllFromCart(cart!.id);
        refetch();
    };

    const getTotalPrice = () => {
        return cart ? getTotalPriceOfCart(cart) : 0;
    };

    const totalPrice = getTotalPrice();

    return {
        cart,
        addCartArticle,
        quantityArticle,
        totalPrice,
        removeArticle,
        removeArticles,
        refetch,
        createCart,
    };
};

export default useCart;
