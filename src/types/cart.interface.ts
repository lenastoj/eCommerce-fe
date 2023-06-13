import { Article } from "./article.interface";

export interface Cart {
    id: number;
    userId: number;
    articles: Article[];
}
