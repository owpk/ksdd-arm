import {
    RestDao,
    OffsetPageable,
    OffsetPageableQuery,
    PaginationProps,
    Table,
    TableProps,
    Pagination
} from "./index";

import {calculateParts} from "./utils/calculateParts";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {ITransformedLog} from "../../types";

export interface TProps {
    dao: RestDao<any>,
    paginationProps: PaginationProps,
    tableProps: TableProps<any>
}

let totalDataLength = 100

export const OffsetTable: FunctionComponent<TProps> = (tProps: TProps) => {

    const [a_logs, setApiLogs]          = useState<ITransformedLog[][]>([[]])
    const [currentPage, setLocalPage]   = useState(0)
    const [api_page, setApiPage]        = useState(0)

    let apiPageSize = tProps.paginationProps.tablePageSize * tProps.paginationProps.pagePerApiRequest
    let localPages = Math.ceil(apiPageSize / tProps.paginationProps.tablePageSize)
    let queryPages = Math.ceil(totalDataLength / apiPageSize)

    const tableParts: OffsetPageable[] = calculateParts(localPages, tProps.paginationProps.tablePageSize)

    const queryParts: OffsetPageableQuery[] =
        calculateParts(queryPages, apiPageSize)

    useEffect(() => {
        tProps.dao.fetchPageableData(queryParts[api_page])
            .then(d => {
                let logs: any[] = d.data.content

                totalDataLength = d.data.totalElements

                let pages: any[][] = tableParts.map(x => logs.slice(x.from,
                    (x.to > logs.length) ? logs.length : x.to))
                setApiLogs(pages);
            })
            .catch(e => console.log("API ERROR" + e))

    }, [api_page])

    // TODO*
    // <Filter />
    return (
        <>
            <Table data={a_logs[currentPage]}
                   tableProps={tProps.tableProps}
            />

            <Pagination totalPages={Math.ceil(totalDataLength / tProps.paginationProps.tablePageSize)}
                        localPages={localPages}
                        setLocalPage={setLocalPage}
                        setApiPage={setApiPage}
            />
        </>
    )
}

export default OffsetTable;
