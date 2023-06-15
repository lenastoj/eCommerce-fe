import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import { useGetSizesQuery } from '../queries/sizes.query';
import { useGetColorsQuery } from '../queries/colors.query';

interface Props {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    orderBy: string;
    setOrderBy: React.Dispatch<React.SetStateAction<string>>;
    size: string[];
    setSize: React.Dispatch<React.SetStateAction<string[]>>;
    color: string[];
    setColor: React.Dispatch<React.SetStateAction<string[]>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
}
const SortFilter = ({
    sort,
    setSort,
    orderBy,
    setOrderBy,
    size,
    setSize,
    color,
    setColor,
    gender,
    setGender,
}: Props) => {
    const {
        error: errorSizes,
        data: sizesData,
        isLoading: isLoadingSizes,
    } = useGetSizesQuery();
    const {
        error: errorColors,
        data: colorsData,
        isLoading: isLoadingColors,
    } = useGetColorsQuery();
    const sortBy = ['price', 'createdAt'];
    const sortOrder = ['asc', 'desc'];
    const genderOptions = ['man', 'woman'];

    const handleChangeSize = (value: any) => {
        setSize(value.includes('none') ? [] : value);
    };

    const handleChangeColor = (value: any) => {
        setColor(value.includes('none') ? [] : value);
    };

    const handleChangeSort = (value: any) => {
        setSort(value.includes('none') ? '' : value);
    };

    const handleChangeOrder = (value: any) => {
        setOrderBy(value.includes('none') ? '' : value);
    };

    const handleChangeGender = (value: any) => {
        setGender(value.includes('none') ? '' : value);
    };

    return (
        <div>
            {errorColors || errorSizes ? (
                <Typography>
                    {errorColors?.errors[0].msg} {errorSizes?.errors[0].msg}
                </Typography>
            ) : (
                <div>
                    {!isLoadingColors && !isLoadingSizes && (
                        <div>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="size">Size</InputLabel>
                                <Select
                                    labelId="size"
                                    id="size"
                                    multiple
                                    value={size}
                                    onChange={(e) =>
                                        handleChangeSize(e.target.value)
                                    }
                                    label="Size"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {sizesData?.map((sizeData) => (
                                        <MenuItem
                                            key={sizeData.id}
                                            value={sizeData.sizeShoe}
                                        >
                                            {sizeData.sizeShoe}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="color">Color</InputLabel>
                                <Select
                                    labelId="color"
                                    id="color"
                                    multiple
                                    value={color}
                                    onChange={(e) =>
                                        handleChangeColor(e.target.value)
                                    }
                                    label="Color"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {colorsData?.map((colorData) => (
                                        <MenuItem
                                            key={colorData.id}
                                            value={colorData.name}
                                        >
                                            {colorData.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="sort">Sort by</InputLabel>
                                <Select
                                    labelId="sort"
                                    id="sort"
                                    value={sort}
                                    onChange={(e) =>
                                        handleChangeSort(e.target.value)
                                    }
                                    label="Sort"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {sortBy?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="order">Order by</InputLabel>
                                <Select
                                    labelId="order"
                                    id="order"
                                    value={orderBy}
                                    onChange={(e) =>
                                        handleChangeOrder(e.target.value)
                                    }
                                    label="Order"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {sortOrder?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
                                    value={gender}
                                    onChange={(e) =>
                                        handleChangeGender(e.target.value)
                                    }
                                    label="Gender"
                                >
                                    <MenuItem value="none">
                                        <em>None</em>
                                    </MenuItem>
                                    {genderOptions?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SortFilter;
