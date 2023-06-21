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