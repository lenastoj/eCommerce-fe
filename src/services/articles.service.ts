import { Article, Pagination } from '../types/article.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';


export default class ArticleService {
    static client = httpService;

    static getAll = async (page = 1, sort?: string, orderBy?: string, size?: string[], color?: string[], gender?: string) => {
        return await this.client.request<Pagination<Article[]>>({
            url: ROUTES.SHOES,
            params: {page, sort, orderBy, size, color, gender},
            method: 'GET',
        });
    };

    static search = async (searchParams: string | undefined) => {
        return await this.client.request<Article[]>({
            url: ROUTES.SEARCH_SHOES,
            data: {searchParams},
            method: 'POST'
        })
    }

    static get = async (name: string) => {
        return await this.client.request<Article>({
            url: `${ROUTES.SHOES}/${name}`,
            method: 'GET',
        });
    };

    static createArticle =async (formData: FormData) => {
        return await this.client.request<Article>({
            url: ROUTES.CREATE_SHOE,
            data: formData,
            method: 'POST',
        })
    }
}


