import { Cart } from '../types/cart.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class CartService {
    static client = httpService;

    static getUserCart = async () => {
        return await this.client.request<Cart>({
            url: ROUTES.CART,
            method: 'GET',
        });
    };

    static addArticleToCart = async (articleId: number, quantity: number) => {
        return await this.client.request<Cart>({
            url: ROUTES.CART,
            data: { articleId, quantity },
            method: 'PUT',
        });
    };

    static removeAllFromCart = async () => {
        return await this.client.request({
            url: ROUTES.CART,
            method: 'DELETE',
        });
    };
}
