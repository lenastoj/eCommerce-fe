import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/static';
import { Size } from '../types/article.interface';
import { ErrorResponse } from '../types/error.type';
import SizeService from '../services/size.service';


export const useGetSizesQuery = () => {
    return useQuery<Size[], ErrorResponse>([QUERY_KEYS.SIZES], async() => {
        return await SizeService.getAll();
    })
}