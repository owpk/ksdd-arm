import {getQueryParamsFromProps, restClient} from "utils/index";
import {AxiosResponse} from "axios";
import {ITransformedLogs, PaginationProps, Pageable} from "types/index";

class LogMsgDao {

    fetchLogs(queryParams: string): Promise<AxiosResponse<Pageable<ITransformedLogs>>> {
        return restClient.get('http://localhost:8080/api/logs' + queryParams);
    }

}

export { LogMsgDao }
export type { PaginationProps }
