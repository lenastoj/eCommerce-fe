import { Color } from '../types/article.interface';
import { ROUTES } from '../utils/static';
import httpService from './http.service';

export default class ColorService {
    static client = httpService;

    static getAll = async () => {
        return await this.client.request<Color[]>({
            url: ROUTES.COLORS,
            method: 'GET',
        });
    };
}


