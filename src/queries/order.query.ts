import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../utils/static"
import { ErrorResponse } from "../types/error.type"
import { Order } from "../types/order.interface"
import OrderService from "../services/order.service"
import { Pagination } from "../types/pagination.interface"



export const useGetOrderQuery = () => {
    return useQuery<Pagination<Order[]>,  ErrorResponse>([QUERY_KEYS.ORDERS], async() => {
        return await OrderService.getOrders();
    })
}