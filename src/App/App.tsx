import React, {useCallback, useEffect, useState} from 'react';
import {ITransformedLogs, Pageable, PageableQuery} from "types/index";
import {LogMsgTable} from "components/LogMsgTable/index";
import {LogMsgDao} from "services/LogMsg/index";
import type {PaginationProps} from "services/LogMsg/index";
import Pagination from "components/Pagination/index";
import {calculateQueryParts} from "../utils";

let logMsgDao: LogMsgDao = new LogMsgDao();

const msgProps: PaginationProps = {
    apiPageSize: 10,
    tablePageSize: 5,
    totalDataLength: 20
}

let coll: number = 0;

function App() {

    console.log(coll++);

    const pages: string[] = calculateQueryParts(msgProps)

    const [t_logs, setLogs] = useState<ITransformedLogs[]>([])
    const [currentPage, setPage] = useState(0)

    console.log('PROPS :: ' + msgProps)

    console.log('CURR PAGE:: ' + currentPage)

    console.log('PAGES:: ' + pages[currentPage])


    let callback = (query:string):void => {
        logMsgDao.fetchLogs(query)
            .then(d => setLogs(d.data.content))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        callback(pages[currentPage])
    })

    return (
        <main className="container">
            <div className="bg-light p-5 rounded">
                <LogMsgTable logs={t_logs}/>
                {/*<Pagination currentPage={currentPage} pages={pages}*/}
                {/*            setPage={setPage} callback={callback}/>*/}
            </div>
        </main>
    )
}

export default App;
