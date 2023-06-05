import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/static';
import { Article, Pagination } from '../types/article.interface';
import { ErrorResponse } from '../types/error.type';
import ArticleService from '../services/articles.service';


export const useGetArticlesQuery = (page: number) => {
    return useQuery<Pagination<Article[]>, ErrorResponse>([QUERY_KEYS.ARTICLES], async() => {
        return await ArticleService.getAll(page);
    });  
}

export const useGetArticleQuery = (name: string) => {
    return useQuery<Article , ErrorResponse>([QUERY_KEYS.ARTICLE], async() => {
        return await ArticleService.get(name);
    });
    
}