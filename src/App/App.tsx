import React from 'react';
import OffsetTable from "../components/OffsetTable/OffsetTable";
import {PaginationProps, TableProps} from "../components/OffsetTable";
import {ITransformedLog} from "../types";
import {LogMsgDao} from "../services/dao";

const msgProps: PaginationProps = {
    apiPageSize: 10,
    tablePageSize: 5,
    totalDataLength: 10
}

let dao: LogMsgDao = new LogMsgDao()

let tableProps: TableProps<ITransformedLog, any> = {
    mapFunc: value => {
        <td>
            <tr>{value.objId}</tr>
            <tr>{value.content}</tr>
            <tr>{value.transformed ? 'Y' : 'N'}</tr>
        </td>
    },

    columns: ['objId', 'content', 'transformed']
}

function App() {

    return (
        <main className="container">
            <div className="bg-light p-5 rounded">
                <main className="container">
                    <div className="bg-light p-5 rounded">
                        <OffsetTable dao={dao} paginationProps={msgProps} tableProps={tableProps}/>
                    </div>
                </main>

            </div>
        </main>
    )
}

export default App;
