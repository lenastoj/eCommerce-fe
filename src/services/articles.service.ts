import {
    Article,
    ArticlesResponse,
    Metadata,
} from '../types/article.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

class ArticleService {
    client: AxiosInstance;
    constructor() {
        this.client = httpService.client;
    }

    getAll = async (
        page: null | number,
        queryParameters: Record<string, string>
    ) => {
        const params = [];
        if (page) {
            params.push(`page=${page}`);
        }

        for (const param in queryParameters) {
            if (queryParameters[param]) {
                params.push(`${param}=${queryParameters[param]}`);
            }
        }

        const queryString = params.join('&');

        try {
            const response: AxiosResponse<ArticlesResponse> =
                await this.client.get(`${ROUTES.SHOES}?${queryString}`);

            return response.data;
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    };

    get = async (name: string | undefined) => {
        const response = await this.client.get(`${ROUTES.SHOES}/${name}`);
        return response.data;
    };
}

const articleService = new ArticleService();
export default articleService;
