export interface ITransformedLogs {
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
  readonly logs: ITransformedLogs[]
  readonly total?: number
}

export const MockData: ITransformedLogs[] = [
    { objId: '1', content: "ads", transformed: true },
    { objId: '1', content: "ads", transformed: true },
    { objId: '1', content: "ads", transformed: true },
    { objId: '1', content: "ads", transformed: true },
    { objId: '1', content: "ads", transformed: true }
]

export interface PaginationProps {
    tablePageSize: number
    apiPageSize: number
    totalDataLength: number
}

export interface PageableQuery {
    from: number
    to: number
    filter?: {key: string, value: string}[]
}

