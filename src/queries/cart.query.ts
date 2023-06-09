import { useQuery } from "@tanstack/react-query"
import { Cart } from "../types/cart.interface"
import { QUERY_KEYS } from "../utils/static"
import CartService from "../services/cart.service"
import { ErrorResponse } from "../types/error.type"



export const useGetUserCartQuery = () => {
    return useQuery<Cart,  ErrorResponse>([QUERY_KEYS.CART], async() => {
        return await CartService.getUserCart();
    })
}