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
import React, {useEffect, useState} from 'react';

function OffsetTable<T, U>(dao: RestDao<T>,
                           paginationProps: PaginationProps,
                           tableProps: TableProps<T, U>) {

    const queryParts: OffsetPageableQuery[] =
        calculateParts(paginationProps.apiPageSize, paginationProps.totalDataLength)

    let localPages = Math.ceil(paginationProps.apiPageSize / paginationProps.tablePageSize)

    const [a_logs, setApiLogs] = useState<T[][]>([[]])
    const [currentPage, setLocalPage] = useState(0)

    console.log('CURR PAGE:: ' + currentPage)

    useEffect(() => {
        dao.fetchPageableData(queryParts[currentPage])
            .then(d => {
                let logs: T[] = d.data.content
                const tableParts: OffsetPageable[] = calculateParts(localPages, paginationProps.tablePageSize);

                let pages: T[][] = tableParts.map(x => logs.slice(x.from,
                    (x.to > logs.length) ? logs.length : x.to))

                console.log("LOGS: " + pages.map(x => `data length: ${x.length}`).join(" : "))
                setApiLogs(pages);
            })
            .catch(e => console.log("API ERROR" + e))
    }, [])

    return (
        <>
            <Table data={a_logs[currentPage]} tableProps={tableProps}/>

            <Pagination totalPages={20}
                        localPages={localPages}
                        setLocalPage={setLocalPage}
            />
        </>
    )
}

export default OffsetTable;
