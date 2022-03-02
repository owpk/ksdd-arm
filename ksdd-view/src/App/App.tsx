import React from 'react';
import OffsetTable from "../components/OffsetTable/OffsetTable";
import {PaginationProps, TableProps} from "../components/OffsetTable";
import {LogMsgDao} from "../services/dao";
import {v4 as uuidv4} from 'uuid';
import {ITransformedLog} from "../types";
import {CacheableLogMsgDao} from "../services/dao/LogMsg/CacheableLogMsgDao";
import {WebsocketArea} from "../components/WSC/WebsocketArea";

let dao: LogMsgDao = new CacheableLogMsgDao(new LogMsgDao())

let tableProps: TableProps<ITransformedLog> = {
    mapFunc: value => (
        <tr>
            <td key={value.objId}>{value.objId}</td>
            <td key={value.content}>{value.content}</td>
            <td key={uuidv4()}>{value.transformed ? 'Y' : 'N'}</td>
        </tr>
    ),

    columns: ['objId', 'content', 'transformed']
}

const msgProps3: PaginationProps = {
    pagePerApiRequest: 5,
    tablePageSize: 50
}

function App() {
    return (
        <>
            <main className="container">
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#!/main">KSDD ARM</a>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto sidenav" id="navAccordion">
                            <li ng-if="isUserLoggedIn() && !isAdmin()" className="nav-item">
                                <a className="nav-link" href="#!/errands_create">main</a>
                            </li>
                            <li ng-if="isMaster() || isAdmin()" className="nav-item">
                                <a className="nav-link" href="#!/errands_pending">journal</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div />
                <div className={"bg-light p-5 rounded"}>
                    <WebsocketArea />
                    <OffsetTable dao={dao}
                                 paginationProps={msgProps3}
                                 tableProps={tableProps}/>
                </div>
            </main>
        </>
    )
}

export default App;
