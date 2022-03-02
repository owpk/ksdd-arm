import {LogMsgDao} from "./LogMsgDao";
import {OffsetPageableQuery, Pageable} from "../../../components/OffsetTable";
import {ITransformedLog} from "../../../types";
import {AxiosResponse} from "axios";
import {Cache, CacheContext} from "../../../utils/Cache";

const ctx: CacheContext = new CacheContext();

class CacheableLogMsgDao extends LogMsgDao {

    private cacheName: string = 'logMsg'

    constructor(readonly origin: LogMsgDao) {
        super();
        ctx.putCache(this.cacheName, new Cache<string, Promise<AxiosResponse<Pageable<ITransformedLog>>>>(15))
    }

    fetchPageableData(offsetPageable: OffsetPageableQuery): Promise<AxiosResponse<Pageable<ITransformedLog>>> {
        let key: string = `${offsetPageable.from}:${offsetPageable.to}:${offsetPageable.filter}`
        let cache: Cache<string, Promise<AxiosResponse<Pageable<ITransformedLog>>>> = ctx.getCache(this.cacheName)
        if (cache.get(key) === null)
            cache.put(key, this.origin.fetchPageableData(offsetPageable))
        return cache.get(key) as Promise<AxiosResponse<Pageable<ITransformedLog>>>;
    }
}

export {CacheableLogMsgDao}
