import {ITransformedLog} from "types";
import {AbsRestDao} from "../AbsRestDao";

class LogMsgDao extends AbsRestDao<ITransformedLog> {

    protected getEndpoint(): string {
        return 'http://localhost:8080/api/logs';
    }
}

export {LogMsgDao}
