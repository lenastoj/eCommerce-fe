export interface Article {
    id: number;
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    inStocke: boolean;
    gender: string;
    colors: Color[];
    sizes: Size[];
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

export interface Metadata {
    page: string | number;
    paginationLimit: number;
    count: number;
    total: number;
}


export interface Pagination<D = any> {
    data: D;
    metadata: Metadata;
}
