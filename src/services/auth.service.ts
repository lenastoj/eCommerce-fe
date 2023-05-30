import { LoginValues } from '../types/login.type';
import { RegisterValues } from '../types/register.type';
import { User } from '../types/user.interface';
import httpService from './http.service';
import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { ErrorLogin, ErrorRegister } from '../types/error.type';

class AuthService {
    client: AxiosInstance;
    constructor() {
        this.client = httpService.client;
    }

    login = async (credentials: LoginValues) => {
        const response = await this.client.post<
            AxiosResponse<User, AxiosError<ErrorLogin>>
        >('/login', credentials);
        return response.data;
    };

    register = async (userData: RegisterValues) => {
        const response = await this.client.post<
            AxiosResponse<User, AxiosError<ErrorRegister>>
        >('/register', userData);
        return response.data;
    };

    logout = async () => {
        try {
            const response = await this.client.post<AxiosResponse<AxiosError>>(
                '/logout'
            );
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    };
}

const authService = new AuthService();
export default authService;
