import {PageableQuery, PaginationProps} from "../types";
import {calculateQueryParts, getQueryParamsFromProps} from "utils/index";


test('', () => {

    const msgProps: PaginationProps = {apiPageSize: 10, tablePageSize: 5, totalDataLength: 20};
    const q: PageableQuery = {from: 0, to: 50, filter: []}

    let g = getQueryParamsFromProps(q)
    console.log('QUERY: ' + g)

    let s: string[] = calculateQueryParts(msgProps)
    console.log('PARTS: ' + s[0])

    let p: string[] = Array.from({length: 5}, (_, i) => {
        let counter = i * msgProps.tablePageSize;
        let lastFrom = (i === 0) ? 0 : i * counter + 1;
        let lastTo = counter + msgProps.tablePageSize;
        return q
    }).map(x => getQueryParamsFromProps(x));

    // let ss: string[] = p.map(x => getQueryParamsFromProps(x))
    console.log('PAGEABLE: ' + p)
})
