import { Checkout } from '../types/checkout.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class CheckoutService {
    static client = httpService; 


    static createPayment = async () => {
        return await this.client.request<Checkout>({
            url: ROUTES.CHECKOUT,
            method: 'POST'
        })
    }
}