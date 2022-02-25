import {getQueryParamsFromProps, restClient} from "utils/index";
import {AxiosResponse} from "axios";
import {ITransformedLog, PaginationProps, Pageable} from "types/index";

class LogMsgDao {

    fetchLogs(queryParams: string): Promise<AxiosResponse<Pageable<ITransformedLog>>> {
        return restClient.get('http://localhost:8080/api/logs' + queryParams);
    }

}

export { LogMsgDao }
export type { PaginationProps }
