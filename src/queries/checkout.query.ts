import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/static';
import CheckoutService from '../services/checkout.service';
import { Checkout } from '../types/checkout.interface';



export const useGetCheckoutQuery = () => {
    return useQuery<Checkout>([QUERY_KEYS.CHECKOUT], async () => {
        return await CheckoutService.createPayment();
    });
};
