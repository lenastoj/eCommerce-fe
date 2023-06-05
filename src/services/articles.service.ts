import { Article, Pagination } from '../types/article.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class ArticleService {
    static client = httpService;

    static getAll = async (page = 1) => {
        return await this.client.request<Pagination<Article[]>>({
            url: ROUTES.SHOES, // '/shoes'
            params: {page},
            method: 'GET',
        });
    };

    static get = async (name: string) => {
        return await this.client.request<Article>({
            url: `${ROUTES.SHOES}/${name}`,
            method: 'GET',
        });
    };
}


