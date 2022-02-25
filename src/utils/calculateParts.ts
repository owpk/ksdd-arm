import {OffsetPageableQuery, PaginationProps} from "types/index";
import {getQueryParamsFromProps} from "./getQueryParamsFromProps";
import {OffsetPageable} from "types/index";

export function calculateQueryParts(props: PaginationProps, params?: { key: string, value: string }[]): string[] {
    const viewPages = Math.ceil(props.apiPageSize / props.tablePageSize);
    return calculateParts(viewPages, props.apiPageSize)
        .map(x => {
            return {from: x.from, to: x.to, filter: params} as OffsetPageableQuery
        })
        .map(x => getQueryParamsFromProps(x))
}

export function calculateParts(totalPages: number, pageSize: number): OffsetPageable[] {
    return Array.from({length: totalPages}, (_, i) => {
        let lastFrom = (i === 0) ? 0 : i * pageSize + 1;
        let lastTo = lastFrom + pageSize;
        return {from: lastFrom, to: lastTo} as OffsetPageable
    });
}
