import * as React from 'react';
import {
    IconButton,
    AppBar,
    Box,
    Button,
    CssBaseline,
    Toolbar,
    Link,
    GlobalStyles,
    Container,
    Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Outlet } from 'react-router-dom';
import authService from '../services/auth.service';
import UserContext from '../context/User.context';
import { useContext } from 'react';
import { ROUTES } from '../utils/static';
import CartContext from '../context/Cart.context';
import Search from './Search';

const Navigation = () => {
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);
    const { logout } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            logout();
            await authService.logout();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box>
            <GlobalStyles
                styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
            />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Link
                        href={ROUTES.SHOES}
                        underline="none"
                        sx={{ flexGrow: 1 }}
                        paddingLeft={40}
                        variant="h6"
                    >
                        eCommerce
                    </Link>
                    <Search />
                    <nav style={{ paddingRight: '400px' }}>
                        {user && (
                            <IconButton
                                color="primary"
                                aria-label="add to shopping cart"
                                sx={{ mr: '15px' }}
                                href={ROUTES.CART}
                            >
                                {user && cart && (
                                    <Typography>
                                        {cart?.articles?.length}
                                    </Typography>
                                )}

                                <AddShoppingCartIcon />
                            </IconButton>
                        )}

                        {user && (
                            <IconButton
                                color="primary"
                                aria-label="aorders"
                                sx={{ mr: '15px' }}
                                href={ROUTES.ORDERS}
                            >
                                <LocalShippingIcon />
                            </IconButton>
                        )}

                        {user?.user.isAdmin === true && (
                            <Button
                                href={ROUTES.CREATE_SHOE}
                                variant="outlined"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Add Article
                            </Button>
                        )}

                        {!user && (
                            <Button
                                href={ROUTES.REGISTER}
                                variant="outlined"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Register
                            </Button>
                        )}

                        {!user && (
                            <Button
                                href={ROUTES.LOGIN}
                                variant="outlined"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                Login
                            </Button>
                        )}

                        {user && (
                            <Button
                                variant="outlined"
                                sx={{ my: 1, mx: 1.5 }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </nav>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Navigation;
