import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { ROUTES } from './utils/static';
import Navigation from './components/Navigation';
import ArticlesPage from './pages/articles/ArticlesPage';
import SingleArticlePage from './pages/articles/SingleArticlePage';
import CreateArticle from './pages/articles/CreateArticle';
import CartPage from './pages/CartPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Navigation />}>
                <Route
                    path={ROUTES.HOME}
                    element={<Navigate to={ROUTES.SHOES} replace />}
                />

                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SHOES} element={<ArticlesPage />} />
                <Route path={ROUTES.SHOE} element={<SingleArticlePage />} />
                <Route path={ROUTES.CREATE_SHOE} element={<CreateArticle />} />
                <Route path={ROUTES.CART} element={<CartPage />} />
            </Route>
            <Route path="*" element={<p>Page not found</p>} />
        </Routes>
    );
};

export default AppRoutes;
