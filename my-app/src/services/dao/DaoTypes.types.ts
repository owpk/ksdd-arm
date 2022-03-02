import {AxiosResponse} from "axios";
import {OffsetPageableQuery, Pageable} from "../../components/OffsetTable";

export interface RestDao<T> {
    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<T>>>
}
