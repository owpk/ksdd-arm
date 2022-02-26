import {getQueryParamsFromProps} from "../../components/OffsetTable/index";
import {Pageable, OffsetPageableQuery} from "../../components/OffsetTable/index";
import {AxiosResponse} from "axios";
import {RestDao} from "./DaoTypes.types";
import {restClient} from "../../utils/RestClient";

abstract class AbsRestDao<T> implements RestDao<T>{

    protected abstract getEndpoint(): string

    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<T>>> {
            let url = this.getEndpoint() + getQueryParamsFromProps(offsetPageable)
            console.log("LOG REQUEST WITH URL: " + url)
            return restClient.get(url);
    }
}

export { AbsRestDao }
