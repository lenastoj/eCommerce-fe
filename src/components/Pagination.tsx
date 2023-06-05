import React from 'react';
import { Pagination } from '@mui/material';

interface Props {
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({
    isLoading,
    totalPages,
    setCurrentPage,
    currentPage,
}: Props) => {
    const handleChange = (value: number) => {
        setCurrentPage(value);
    };

    return (
        <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            disabled={isLoading}
            onChange={(e, value) => handleChange(value)}
            page={currentPage}
        />
    );
};

export default PaginationComponent;
