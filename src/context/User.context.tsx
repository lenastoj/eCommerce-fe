import { User } from '../types/user.interface';
import { Context, createContext } from 'react'



interface IUserContext {
    user?: User;
    setUser: (user: User) => void;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext: Context <IUserContext> = createContext<IUserContext>({
    setUser: () => Function,
    login: () => Function,
    logout: () => Function,
})

export default UserContext;