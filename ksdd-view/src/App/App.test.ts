import {getQueryParamsFromProps, OffsetPageable, OffsetPageableQuery, PaginationProps} from "../components/OffsetTable";
import {calculateParts} from "../components/OffsetTable/utils/calculateParts";

test('', () => {

    const msgProps: PaginationProps = {pagePerApiRequest: 2, tablePageSize: 5};
    const q: OffsetPageableQuery = {from: 0, to: 50, filter: []}

    let g = getQueryParamsFromProps(q)
    console.log('QUERY: ' + g)

    let p: string[] = Array.from({length: 5}, (_, i) => {
        let counter = i * msgProps.tablePageSize;
        let lastFrom = (i === 0) ? 0 : i * counter + 1;
        let lastTo = counter + msgProps.tablePageSize;
        return q
    }).map(x => getQueryParamsFromProps(x));

    console.log('PAGEABLE: ' + p)

})

test('s', () => {

    let requestPerPageArray: OffsetPageable[] = calculateParts(100, 2)

    let requestPerPageMap: { key: number, value: OffsetPageable }[] =
        Array.from({length: Math.ceil(100 / 20)},
            (_, i) => {
                return {key: i, value: requestPerPageArray[i]}
            })

    console.log(requestPerPageMap)

    const calculateApiPage = (localPage: number, map: {key: number, value: OffsetPageable}[]): number => {
        let val = map.find(x => x.value.from <= localPage
            && x.value.to >= localPage)
        return val ? val.key + 1 : 1;
    }

    let a = calculateApiPage(2, requestPerPageMap)
    console.log(a)
})

test('ds', () => {

})
