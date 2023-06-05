import { LoginValues } from '../types/login.type';
import { RegisterValues } from '../types/register.type';
import { User } from '../types/user.interface';
import httpService from './http.service';
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ErrorLogin, ErrorResponse } from '../types/error.type';
import { ROUTES } from '../utils/static';

class AuthService {
    client: AxiosInstance;
    constructor() {
        this.client = httpService.client;
    }

    login = async (credentials: LoginValues) => {
        const response = await this.client.post<
            AxiosResponse<User, AxiosError<ErrorLogin>>
        >(ROUTES.LOGIN, credentials);
        return response.data;
    };

    register = async (userData: RegisterValues) => {
        const response = await this.client.post<
            AxiosResponse<User, AxiosError<ErrorResponse>>
        >(ROUTES.REGISTER, userData);
        return response.data;
    };

    logout = async () => {
        try {
            const response = await this.client.post<AxiosResponse<AxiosError>>(
                ROUTES.LOGOUT
            );
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    };
}

const authService = new AuthService();
export default authService;
