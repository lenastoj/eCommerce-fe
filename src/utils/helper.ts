import { Cart } from '../types/cart.interface';

export const getTotalPriceOfCart = (cart: Cart) => {
    const totalPrice = cart?.articles?.reduce((accumulator, article) => {
      return accumulator + article.price * article.CartArticle!.quantity;
    }, 0);
  
    return totalPrice || 0;
  };