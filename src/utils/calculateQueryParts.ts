import {PageableQuery, PaginationProps} from "types/index";
import {getQueryParamsFromProps} from "./getQueryParamsFromProps";

export function calculateQueryParts(props: PaginationProps, params?: { key: string, value: string }[]): string[] {

    const viewPages = Math.ceil(props.apiPageSize / props.tablePageSize);

    return Array.from({length: viewPages}, (_, i) => {
        let counter = i * props.tablePageSize;
        let lastFrom = (i === 0) ? 0 : i * counter + 1;
        let lastTo = counter + props.tablePageSize;
        return {from: lastFrom, to: lastTo, filter: params} as PageableQuery
    }).map(x => getQueryParamsFromProps(x));
}
