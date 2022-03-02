import {TableProps} from "./index";
import React, {FunctionComponent} from "react";

export interface T_TProps {
    data: any[]
    tableProps: TableProps<any>
}

export const Table: FunctionComponent<T_TProps> = (tp: T_TProps) => {
    return (
        <div>
            <table className="table table-primary table-hover">
                <thead>
                <tr>
                    {
                        tp.tableProps.columns.map((title) => (
                            <th key={title}>{title}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    tp.data.map(tp.tableProps.mapFunc)
                }
                </tbody>
            </table>
        </div>
    )
}
