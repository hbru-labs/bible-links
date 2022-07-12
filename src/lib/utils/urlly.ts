import { goto } from '$app/navigation';
import urlly from '@latitudelabs/urlly';

export type QueryParamType = 'translation' | 'language';
export const { getSearchParams, updateQueryParams } = urlly<QueryParamType>(goto);
