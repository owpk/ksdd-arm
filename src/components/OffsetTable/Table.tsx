import {TableProps} from "./index";

export function Table<T, U>(data: T[], tableProps: TableProps<T, U>) {
    console.log("CURRENT LOG TABLE PART: " + data.length)
    return (
        <div>
            <table className="table table-primary table-hover">
                <thead>
                <tr>
                    {
                        tableProps.columns.map((title) => (
                            <th key={title}>{title}</th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {data.map(tableProps.mapFunc)}
                </tbody>
            </table>
        </div>
    )
}
