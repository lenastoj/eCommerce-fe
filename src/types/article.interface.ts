export interface ArticleDraft {
    name: string;
    description?: string;
    imageUrl: string;
    price: number;
    inStock: boolean;
    gender: string;
    userId: number;
    colors: Color[];
    sizes: Size[];

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

export interface Metadata {
    page: string | number;
    paginationLimit: number;
    count: number;
    total: number;
}


export interface Pagination<D = unknown> {
    data: D;
    metadata: Metadata;
}
