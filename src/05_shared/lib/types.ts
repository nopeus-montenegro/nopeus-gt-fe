import { CAR_FILTER, CAR_SORT, LAP_TIME_FILTER, SERVICE_SEARCH_PARAMS, SETUP_FILTER, SETUP_SORT, SORT_DIRECTION, SORT_TYPE, TRACK_FILTER, TRACK_SORT } from './const';

export type AsyncPageSearchParams = Promise<ResolvedPageSearchParams>;

export type ResolvedPageSearchParams = Record<
    SORT_DIRECTION | SORT_TYPE | SETUP_SORT | SETUP_FILTER | TRACK_SORT | TRACK_FILTER | CAR_SORT | CAR_FILTER | LAP_TIME_FILTER | SERVICE_SEARCH_PARAMS,
    string | string[] | undefined
>;
