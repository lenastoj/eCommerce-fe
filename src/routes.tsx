import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { ROUTES } from './utils/static';
import Navigation from './components/Navigation';
import ArticlesPage from './pages/articles/ArticlesPage';
import SingleArticlePage from './pages/articles/SingleArticlePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Navigation />}>
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SHOES} element={<ArticlesPage />} />
                <Route path={ROUTES.SHOE} element={<SingleArticlePage />} />
            </Route>
            <Route path="*" element={<p>Page not found</p>} />
        </Routes>
    );
};

export default AppRoutes;
