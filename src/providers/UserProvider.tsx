import React from 'react';
import UserContext from '../context/User.context';
import useUser from '../hooks/useUser';

interface Props {
    children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
    const { user, setUser, login, logout } = useUser();

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
