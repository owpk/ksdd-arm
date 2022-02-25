import {getQueryParamsFromProps, restClient} from "utils/index";
import {AxiosResponse} from "axios";
import {ITransformedLog, PaginationProps, Pageable} from "types/index";

class LogMsgDao {

    fetchLogs(queryParams: string): Promise<AxiosResponse<Pageable<ITransformedLog>>> {
        let url = 'http://localhost:8080/api/logs' + queryParams
        console.log("LOG REQUEST WITH URL: " + url)
        return restClient.get(url);
    }

}

export { LogMsgDao }
export type { PaginationProps }
