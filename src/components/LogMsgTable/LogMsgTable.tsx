import React, {FC} from "react";
import {ITransformedLog, LogMsgProps} from "types/index";

const titles: string[] = [
    'Object id',
    'Content',
    'Is transformed'
]

export const LogMsgTable = ({logs, currentPage} : {
    logs: ITransformedLog[][], currentPage: number}) => {

    let part: ITransformedLog[] = logs[currentPage]

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
                {part.map((item) => (
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
