import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import authService from '../services/auth.service';
import UserContext from '../context/User.context';
import { useContext } from 'react';
import { ROUTES } from '../utils/static';

const Navigation = () => {
    const { user } = useContext(UserContext);
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
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        eCommerce
                    </Typography>
                    <nav>
                        {user?.user.isAdmin === true &&(
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
