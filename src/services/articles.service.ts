import { Article } from '../types/article.interface';
import { Pagination } from '../types/pagination.interface';
import { ROUTES } from '../utils/static';
import AlgoliaService from './algolia.service';
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

    static search = async (searchParams: string ) => {
        return await AlgoliaService.search('articles', searchParams)
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


