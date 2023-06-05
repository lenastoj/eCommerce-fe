import React from 'react';
import { Typography, ListItem, ListItemText, Box } from '@mui/material';
import { Size } from '../types/article.interface';

interface Props {
    sizes: Size[];
}

const ArticleSizes = ({ sizes }: Props) => {
    console.log(sizes);
    return (
        <Box>
            {sizes.length > 0 ? (
                <ListItem sx={{ display: 'table-row' }}>
                    <Typography sx={{  mr: 2 }}>Available sizes:</Typography>
                    {sizes.map((size) => (
                        <ListItemText
                            key={size.id}
                            primary={size.sizeShoe}
                            sx={{ display: 'list-item', ml: 2}}
                        />
                    ))}
                </ListItem>
            ) : (
                <ListItem sx={{ display: 'table-row' }}>
                    <Typography sx={{  ml: -2 }}>Available sizes:</Typography>

                    <ListItemText
                        primary="No available sizes"
                        sx={{ display: 'list-item', mr: 4 }}
                    />
                </ListItem>
            )}
        </Box>
    );
};

export default ArticleSizes;
