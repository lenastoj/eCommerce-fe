import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/static';
import { Article } from '../types/article.interface';
import { ErrorResponse } from '../types/error.type';
import ArticleService from '../services/articles.service';
import { Pagination } from '../types/pagination.interface';


export const useGetArticlesQuery = (page: number, sort?: string, orderBy?: string, size?: string[], color?: string[], gender?: string) => {
    return useQuery<Pagination<Article[]>, ErrorResponse>([QUERY_KEYS.ARTICLES], async() => {
        return await ArticleService.getAll(page, sort, orderBy, size, color, gender);
    });  
}

export const useGetArticleQuery = (name: string) => {
    return useQuery<Article , ErrorResponse>([QUERY_KEYS.ARTICLE], async() => {
        return await ArticleService.get(name);
    });
    
}

export const useSearchArticlesQuery = (searchParams: string | undefined) => {
    return useQuery<Article[], ErrorResponse>([QUERY_KEYS.SEARCH_ARTICLES], async() => {
        return await ArticleService.search(searchParams);
    })
}
