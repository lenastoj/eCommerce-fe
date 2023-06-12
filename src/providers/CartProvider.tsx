import React from 'react';
import CartContext from '../context/Cart.context';
import Props from '../types/props.interface';
import useCart from '../hooks/uceCart';

const CartProvider = ({ children }: Props) => {
    const {
        cart,
        addCartArticle,
        totalPrice,
        removeArticle,
        removeArticles,
        changeQuntity,
        refetch,
    } = useCart();

    return (
        <CartContext.Provider
            value={{
                cart,
                addCartArticle,
                totalPrice,
                removeArticle,
                removeArticles,
                changeQuntity,
                refetch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
