import {AxiosResponse} from "axios";
import {Pageable} from "types/index";

import {OffsetPageable, OffsetPageableQuery} from "types/index";

export interface RestDao<T> {
    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<T>>>
}
