import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

class HttpService {
    client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:4000/api',
            withCredentials: true,
        });
    }
    request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.client.request(requestConfig).then(({ data }) => data);
}

const httpService = new HttpService();
export default httpService;
