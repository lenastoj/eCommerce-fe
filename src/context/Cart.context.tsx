import { Context, createContext } from 'react';
import { Cart } from '../types/cart.interface';
import { Article } from '../types/article.interface';

interface ICartContext {
    cart?: Cart;
    addCartArticle: (article: Article) => void;
    totalPrice?: number;
    quantityArticle: (
        quantity: string | (number | undefined)[],
        articleId: number
    ) => void;
    removeArticle: (articleId: number) => void;
    removeArticles: () => void;
    createCart: () => void;
    refetch: () => void;
}

const CartContext: Context<ICartContext> = createContext<ICartContext>({
    addCartArticle: () => Function,
    quantityArticle: () => Function,
    removeArticle: () => Function,
    removeArticles: () => Function,
    createCart: () => Function,
    refetch: () => Function,
});
export default CartContext;
