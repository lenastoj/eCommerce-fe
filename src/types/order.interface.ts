import { Article } from "./article.interface";

export interface Order {
    id: number;
    userId: number;
    status: string;
    amount: number;
    cartId: number;
    createdAt: string;
    articles: Article[];
}