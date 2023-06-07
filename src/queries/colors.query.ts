import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/static';
import { Color } from '../types/article.interface';
import { ErrorResponse } from '../types/error.type';
import ColorService from '../services/color.service';


export const useGetColorsQuery = () => {
    return useQuery<Color[], ErrorResponse>([QUERY_KEYS.COLORS], async() => {
        return await ColorService.getAll();
    })
}