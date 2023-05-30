import { useState } from 'react';
import { User } from '../types/user.interface';
import {
    clearItemFromStorage,
    getItemFromStorage,
    setItemToStorage,
} from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/static';

const useUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(
        getItemFromStorage('user')
    );

    const login = (user: User) => {
        setUser(user);
        setItemToStorage('user', user);
        navigate(ROUTES.HOME);
    };
    const logout = () => {
        clearItemFromStorage('user');
        setUser(undefined);
        navigate(ROUTES.LOGIN);
    };

    return { user, setUser, login, logout };
};

export default useUser;
