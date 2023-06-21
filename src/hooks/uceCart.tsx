import React from 'react';
import { useGetUserCartQuery } from '../queries/cart.query';
import CartService from '../services/cart.service';
import { getTotalPriceOfCart } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/static';

const useCart = () => {
    const navigate = useNavigate();

    const { data: cart, refetch } = useGetUserCartQuery();

    const addCartArticle = async (articleId: number, quantity = 1) => {
        const articleExists = cart?.articles.find(
            (article) => article.id === articleId
        );
        if (articleExists) {
            const newQuantity = articleExists.CartArticle!.quantity + quantity;
            await CartService.addArticleToCart(articleId, newQuantity);
        } else {
            await CartService.addArticleToCart(articleId, quantity);
        }
        refetch();
        navigate(ROUTES.SHOES);
    };

    const changeQuntity = async (articleId: number, quantity: number) => {
        await CartService.addArticleToCart(articleId, quantity);
        refetch();
    };

    const removeArticle = async (articleId: number) => {
        await CartService.addArticleToCart(articleId, 0);
        refetch();
    };

    const removeArticles = async () => {
        await CartService.removeAllFromCart();
        refetch();
        navigate(ROUTES.SHOES);
    };

    const getTotalPrice = () => {
        return cart ? getTotalPriceOfCart(cart) : 0;
    };

    const totalPrice = getTotalPrice();

    return {
        cart,
        addCartArticle,
        totalPrice,
        removeArticle,
        removeArticles,
        changeQuntity,
        refetch,
    };
};

export default useCart;
