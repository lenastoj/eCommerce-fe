import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import UserProvider from './providers/UserProvider';
import CartProvider from './providers/CartProvider';

const defaultTheme = createTheme();

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <UserProvider>
                    <CartProvider>
                        <AppRoutes />
                        <Footer />
                    </CartProvider>
                </UserProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
