import { Cart } from '../types/cart.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class CartService {
    static client = httpService;

    static createUserCart = async () => {
        return await this.client.request<Cart>({
            url: ROUTES.CART,
            method: 'POST',
        });
    };

    static getUserCart = async () => {
        return await this.client.request<Cart>({
            url: ROUTES.CART,
            method: 'GET',
        });
    };

    static addArticleToCart = async (cartId: number, articleId: number) => {
        return await this.client.request<Cart>({
            url: ROUTES.ADD_CART,
            data: { cartId, articleId },
            method: 'POST',
        });
    };

    static quantityArticleCart = async (
        quantity: string | (number | undefined)[],
        articleId: number,
        cartId: number
    ) => {
        return await this.client.request<Cart>({
            url: ROUTES.CART_QUANTITY,
            data: { quantity, articleId, cartId },
            method: 'POST',
        });
    };

    static removeArticleFromCart = async (
        cartId: number,
        articleId: number
    ) => {
        return await this.client.request({
            url: ROUTES.CART_REMOVE_ARTICLE,
            data: { cartId, articleId },
            method: 'DELETE',
        });
    };

    static removeAllFromCart = async (cartId: number) => {
        return await this.client.request({
            url: ROUTES.CART_REMOVE_ARTICLES,
            data: { cartId },
            method: 'DELETE',
        });
    };
}
