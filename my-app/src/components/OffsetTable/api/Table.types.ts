export interface Pageable<T> {
    content: T[]
    totalPages: number
    totalElements: number
}

export interface OffsetPageable {
    from: number
    to: number
}

export interface OffsetPageableQuery extends OffsetPageable {
    filter?: { key: string, value: string }[]
}

export interface TableProps<T> {
    mapFunc: (value: T, index: number, array: T[]) => any
    columns: string[]
}

export interface PaginationProps {
    pagePerApiRequest: number
    tablePageSize: number
}
