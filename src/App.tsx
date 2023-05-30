import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './components/Footer';
import UserProvider from './providers/UserProvider';

const defaultTheme = createTheme();

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <UserProvider>
                    <AppRoutes />
                    <Footer />
                </UserProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
