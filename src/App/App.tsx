import React, {useEffect, useState} from 'react';
import {ITransformedLog, PaginationProps, OffsetPageable} from "types/index";
import {LogMsgDao} from "services/dao/LogMsg/index";
import {calculateParts, calculateQueryParts} from "utils/index";

import {LogMsgTable} from "components/LogMsgTable/index";
import Pagination from "components/Pagination/index";
import {AbsRestDao} from "../services/dao/AbsRestDao";


const msgProps: PaginationProps = {
    apiPageSize: 10,
    tablePageSize: 5,
    totalDataLength: 10
}

function App(logD) {

    let logMsgDao: AbsRestDao<ITransformedLog> = new LogMsgDao();

    const pages: string[] = calculateQueryParts(msgProps)

    let localPages = Math.ceil(msgProps.apiPageSize / msgProps.tablePageSize)

    const [a_logs, setApiLogs] = useState<ITransformedLog[][]>([[]])
    const [currentPage, setLocalPage] = useState(0)
    const [totalPages, setTotalPages] = useState(msgProps.totalDataLength)

    console.log('CURR PAGE:: ' + currentPage)

    let callback = (query: string): void => {
        logMsgDao.fetchLogs(query)
            .then(d => {
                console.log("API RESPONSE: " + d)

                let logs: ITransformedLog[] = d.data.content
                const tableParts: OffsetPageable[] = calculateParts(localPages, msgProps.tablePageSize);

                console.log("PARTS: " + tableParts.map(x => `${x.from} - ${x.to}`).join(" : "))

                let pages: ITransformedLog[][] = tableParts.map(x => logs.slice(x.from,
                    (x.to > logs.length) ? logs.length : x.to))

                console.log("LOGS: " + pages.map(x => `data length: ${x.length}`).join(" : "))
                setApiLogs(pages);
            })
            .catch(e => console.log("API ERROR" + e))
    }

    useEffect(() => {
        callback(pages[currentPage])
        console.log("API LOGS:: " + a_logs.length + " : " + currentPage)
    },[])

    return (
        <main className="container">
            <div className="bg-light p-5 rounded">
                <LogMsgTable logs={a_logs[currentPage]}/>
                <Pagination totalPages={totalPages} localPages={localPages} setLocalPage={setLocalPage}
                />
            </div>
        </main>
    )
}

export default App;
