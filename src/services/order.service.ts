import { Pagination } from "../types/pagination.interface";
import { Order } from "../types/order.interface";
import { ROUTES } from "../utils/static";
import httpService from "./http.service";

export default class OrderService {
    static client = httpService;

    static getOrders = async() => {
        return await this.client.request<Pagination<Order[]>>({
            url: ROUTES.ORDERS,
            method: 'GET',
        })
    }
}