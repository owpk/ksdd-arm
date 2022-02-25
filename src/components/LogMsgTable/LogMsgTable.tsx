import React, {FC} from "react";
import {ITransformedLog, LogMsgProps} from "types/index";

const titles: string[] = [
    'Object id',
    'Content',
    'Is transformed'
]

export const LogMsgTable:FC<LogMsgProps> = ({logs}) => {

    console.log("CURRENT LOG TABLE PART: " + logs)

    return (
        <div>
            <table className="table table-primary table-hover">
                <thead>
                <tr>
                    {titles.map((title) => (
                        <th key={title}>{title}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {logs.map((item) => (
                    <tr>
                        <td>{item.objId}</td>
                        <td>{item.content}</td>
                        <td>{item.transformed ? 'yes' : 'no'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
