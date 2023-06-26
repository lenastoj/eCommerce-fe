import React, { useState, useEffect } from 'react';
import { Autocomplete, Stack, Box, TextField, Typography } from '@mui/material';
import { useSearchArticlesQuery } from '../queries/articles.query';
import { ROUTES } from '../utils/static';
import { useDebounce } from 'use-debounce';

const Search = () => {
    const [searchParams, setSearchParams] = useState('');
    const [debouncedSearchParams] = useDebounce<string>(searchParams, 750);
    const { data: articles, refetch } = useSearchArticlesQuery(searchParams);

    const handleSearchParamsChange = (
        event: { preventDefault: () => void },
        value: React.SetStateAction<string>
    ) => {
        setSearchParams(value);
    };

    useEffect(() => {
        refetch();
    }, [debouncedSearchParams]);

    return (
        <Stack sx={{ width: 300 }}>
            {articles && (
                <Autocomplete
                    onInputChange={handleSearchParamsChange}
                    disablePortal
                    clearOnEscape
                    options={articles}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...props}
                        >
                            <img
                                loading="lazy"
                                width="20"
                                src={`${ROUTES.IMAGES}${option.imageUrl}`}
                                alt=""
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: '1 0 auto',
                                    justifyContent: 'space-between',
                                    flexShrink: 2,
                                }}
                            >
                                <Typography>{option.name}</Typography>
                                <Typography color={'gray'}>
                                    ${option.price}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search..."
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            }}
                        />
                    )}
                    noOptionsText={'No article found'}
                />
            )}
        </Stack>
    );
};

export default Search;
