import React from 'react';
import OffsetTable from "../components/OffsetTable/OffsetTable";
import { PaginationProps, TableProps } from "../components/OffsetTable";
import { LogMsgDao } from "../services/dao";
import { v4 as uuidv4 } from 'uuid';
import { ITransformedLog } from "../types";
import { CacheableLogMsgDao } from "../services/dao/LogMsg/CacheableLogMsgDao";
import WSClient from "../components/WSC/SampleWS";

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
  pagePerApiRequest: 10,
  tablePageSize: 5
}

function App() {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#!/main">KSDD ARM</a>
        </nav>
        <div className="container">
          <div className="row">
            {/*<div className="col-sm">*/}
            {/*    <WSClient/>*/}
            {/*</div>*/}
            <div className="col-sm">
              <OffsetTable dao={dao}
                paginationProps={msgProps3}
                tableProps={tableProps} />
            </div>
          </div>
        </div>
    </>
  )
}

export default App;
