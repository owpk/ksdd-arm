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
import {Filter} from "./Filter";

export interface TProps {
    dao: RestDao<any>,
    paginationProps: PaginationProps,
    tableProps: TableProps<any>
}

let totalDataLength = 100

export const OffsetTable: FunctionComponent<TProps> = (tProps: TProps) => {

    const [a_logs, setApiLogs] = useState<ITransformedLog[][]>([[]])
    const [currentPage, setLocalPage] = useState(0)
    const [api_page, setApiPage] = useState(0)
    const [filter, setFilter] = useState([] as {key: string, value: string}[])

    let apiPageSize = tProps.paginationProps.tablePageSize * tProps.paginationProps.pagePerApiRequest
    let localPages = Math.ceil(apiPageSize / tProps.paginationProps.tablePageSize)
    let queryPages = Math.ceil(totalDataLength / apiPageSize)

    const tableParts: OffsetPageable[] = calculateParts(localPages, tProps.paginationProps.tablePageSize)

    const queryParts: OffsetPageableQuery[] = calculateParts(queryPages, apiPageSize, filter)

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

    }, [api_page, filter])

    return (
        <>
            <Filter setFilter={setFilter}/>

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
