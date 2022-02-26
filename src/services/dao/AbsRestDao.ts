import {calculateParts, calculateQueryParts, getQueryParamsFromProps, restClient} from "utils/index";
import {AxiosResponse} from "axios";
import {PaginationProps, Pageable, OffsetPageable, OffsetPageableQuery} from "types";
import {RestDao} from "./DaoTypes.types";

abstract class AbsRestDao<T> implements RestDao<T>{

    protected abstract getEndpoint(): string

    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<T>>> {
            let url = this.getEndpoint() + getQueryParamsFromProps(offsetPageable)
            console.log("LOG REQUEST WITH URL: " + url)
            return restClient.get(url);
    }
}

export { AbsRestDao }
