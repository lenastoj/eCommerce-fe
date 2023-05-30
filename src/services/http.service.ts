import axios from 'axios';

class HttpService {
    client: any;
    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:4000/api',
            withCredentials: true,
        });
    }
}

const httpService = new HttpService();
export default httpService;
