import React from 'react';
import { Typography, ListItem, ListItemText, Box } from '@mui/material';
import { Color } from '../types/article.interface';

interface Props {
    colors: Color[];
}

const ArticleColors = ({ colors }: Props) => {
    return (
        <Box>
            {colors?.length > 0 ? ( <ListItem sx={{ display: 'table-row' }}>
            <Typography sx={{ ml: 2 }}>Available colors:</Typography>
            {colors.map((color) => (
                <ListItemText
                    key={color.id}
                    primary={color.name}
                    sx={{ display: 'list-item', ml: 4 }}
                />
            ))}
        </ListItem>) : (
              <ListItem sx={{ display: 'table-row' }}>
              <Typography
              sx={{  ml: 2 }}
              >Available colors:</Typography>

              <ListItemText
                  primary="No available colors"
                  sx={{ display: 'list-item', ml: 4 }}
              />
          </ListItem>
        )}
        </Box>
    );
};

export default ArticleColors;
