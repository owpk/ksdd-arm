import React, {useCallback, useEffect, useState} from 'react';
import {ITransformedLog, Pageable, OffsetPageableQuery, OffsetPageable} from "types/index";
import {LogMsgTable} from "components/LogMsgTable/index";
import {LogMsgDao} from "services/LogMsg/index";
import type {PaginationProps} from "services/LogMsg/index";
import Pagination from "components/Pagination/index";
import {calculateParts, calculateQueryParts} from "../utils";

let logMsgDao: LogMsgDao = new LogMsgDao();

const msgProps: PaginationProps = {
    apiPageSize: 10,
    tablePageSize: 5,
    totalDataLength: 10
}

function App() {

    const pages: string[] = calculateQueryParts(msgProps)

    const [a_logs, setApiLogs] = useState<ITransformedLog[]>([])
    const [currentPage, setPage] = useState(0)

    console.log('CURR PAGE:: ' + currentPage)

    console.log('PAGES:: ' + pages[currentPage])

    let callback = (query: string): void => {
        logMsgDao.fetchLogs(query)
            .then(d => {
                console.log("API RESPONSE: " + d)
                let logs: ITransformedLog[] = d.data.content
                const tableParts: OffsetPageable[] = calculateParts(
                    Math.ceil(msgProps.apiPageSize / msgProps.tablePageSize), msgProps.tablePageSize);

                console.log("PARTS: " + tableParts.map(x => `${x.from} - ${x.to}`).join(" : "))

                let pages: ITransformedLog[][] = tableParts.map(x => logs.slice(x.from,
                    (x.to > logs.length) ? logs.length : x.to))

                console.log("LOGS: " + pages.map(x => `data length: ${x.length}`).join(" : "))
                setApiLogs(pages[currentPage]);
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
                <LogMsgTable logs={a_logs}/>

                <Pagination length={2} setPage={setPage}
                />
            </div>
        </main>
    )
}

export default App;
