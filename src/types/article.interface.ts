export interface ArticleDraft {
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    inStock?: boolean;
    gender: string;
    userId?: number;
    colors?: Color[];
    sizes?: Size[];
    CartArticle?: {articleId: number, cartId: number, quantity: number};
    OrderArticle?: {quantity: number, orderId: number, articleId: number};
}

export interface Article extends ArticleDraft {
    id: number;
}


export type Color = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Size = {
    id: number;
    sizeShoe: number;
    createdAt: string;
    updatedAt: string;
};


