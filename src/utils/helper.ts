import { Cart } from "../types/cart.interface";


export const getTotalPriceOfCart = (cart: Cart) => {
    let totalPrice = 0;
    cart.articles.forEach(i => totalPrice += (i.price * i.CartArticle!.quantity))
 
    return totalPrice;
   }