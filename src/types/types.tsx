export interface ITransformedLog {
    objId: string
    content: string
    transformed: boolean
}

export interface Pageable<T> {
    content: T[]
    totalPages: number
    totalElements: number
}

export interface LogMsgProps {
    readonly logs: ITransformedLog[]
    readonly total?: number
}

export const MockData: ITransformedLog[] = [
    {objId: '1', content: "ads", transformed: true},
    {objId: '1', content: "ads", transformed: true},
    {objId: '1', content: "ads", transformed: true},
    {objId: '1', content: "ads", transformed: true},
    {objId: '1', content: "ads", transformed: true}
]

export interface PaginationProps {
    tablePageSize: number
    apiPageSize: number
    totalDataLength: number
}

export interface OffsetPageable {
    from: number
    to: number
}

export interface OffsetPageableQuery extends OffsetPageable {
    filter?: { key: string, value: string }[]
}

