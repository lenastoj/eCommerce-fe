import { Size } from '../types/article.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class SizeService {
    static client = httpService;

    static getAll = async () => {
        return await this.client.request<Size[]>({
            url: ROUTES.SIZES,
            method: 'GET',
        });
    };
}


