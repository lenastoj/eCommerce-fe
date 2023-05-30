import * as React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [1, 2],
            }}
            justifyContent="center"
        >
            {'Copyright © '} eCommerce project {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Footer;
