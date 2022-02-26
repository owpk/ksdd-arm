export interface Pageable<T> {
    content: T[]
    totalPages: number
    totalElements: number
}

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

export interface TableProps<T, U> {
    mapFunc: (value: T, index: number, array: T[]) => U
    columns: string[]
}

export interface PaginationProps {
    apiPageSize: number
    tablePageSize: number
    totalDataLength: number
}
