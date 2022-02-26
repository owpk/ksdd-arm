import {getQueryParamsFromProps, restClient} from "utils";
import {AxiosResponse} from "axios";
import {ITransformedLog, PaginationProps, Pageable} from "types";
import {AbsRestDao} from "../AbsRestDao";

class LogMsgDao extends AbsRestDao<ITransformedLog> {
    fetchLogs(queryParams: string): Promise<AxiosResponse<Pageable<ITransformedLog>>> {
        let url = 'http://localhost:8080/api/logs' + queryParams
        console.log("LOG REQUEST WITH URL: " + url)
        return restClient.get(url);
    }

    protected getEndpoint(): string {
        return 'http://localhost:8080/api/logs';
    }
}

export { LogMsgDao }
export type { PaginationProps }
