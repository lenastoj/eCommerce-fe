import { Context, createContext } from 'react';
import { Cart } from '../types/cart.interface';

interface ICartContext {
    cart?: Cart;
    addCartArticle: (articleId: number, quantity?: number) => void;
    totalPrice?: number;
    removeArticle: (articleId: number) => void;
    removeArticles: () => void;
    changeQuntity: (articleId: number, quantity: number) => void;
    refetch: () => void;
}

const CartContext: Context<ICartContext> = createContext<ICartContext>({
    addCartArticle: () => Function,
    removeArticle: () => Function,
    removeArticles: () => Function,
    changeQuntity: () => Function,
    refetch: () => Function,
});
export default CartContext;
