import {AxiosResponse} from "axios";
import {OffsetPageableQuery, Pageable} from "../index";

export interface RestDao<T> {
    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<T>>>
}
