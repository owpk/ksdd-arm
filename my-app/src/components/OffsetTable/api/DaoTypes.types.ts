import {OffsetPageableQuery} from "../index";

export interface RestDao<T> {
    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<T>
}
