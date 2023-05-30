import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { ROUTES } from './utils/static';
import Navigation from './components/Navigation';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Navigation />}>
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
            </Route>
            <Route path="*" element={<p>Page not found</p>} />
        </Routes>
    );
};

export default AppRoutes;
