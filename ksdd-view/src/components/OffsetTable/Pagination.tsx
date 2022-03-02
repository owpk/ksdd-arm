import {calculateParts} from "./utils/calculateParts";
import {OffsetPageable} from "./api/Table.types";

const showPages = 10

const calculateApiPage = (localPage: number, map: { key: number, value: OffsetPageable }[]): number => {
    let val = map.find(x => localPage >= x.value.from
        && localPage < x.value.to)
    return val ? val.key : 0;
}

let from:number = 0
let to: number

const Pagination = ({totalPages, localPages, setLocalPage, setApiPage}: {
    totalPages: number
    localPages: number
    setLocalPage: (page: number) => void
    setApiPage: (page: number) => void
}) => {

    let paginationArray: number[] =
        Array.from({length: showPages},
            (_, i) => i)

    let requestPerPageArray: OffsetPageable[] = calculateParts(totalPages, localPages)

    let requestPerPageMap: { key: number, value: OffsetPageable }[] =
        Array.from({length: Math.ceil(totalPages / localPages)},
            (_, i) => {
                return {key: i, value: requestPerPageArray[i]}
            })

    if (!to)
        to = requestPerPageMap[0].value.to

    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {paginationArray.map((item) => (
                        <li key={item} className="page-item">
                            <a onClick={
                                () => {
                                    let apiPg = calculateApiPage(item, requestPerPageMap)
                                    console.log('-----------------')
                                    console.log('PAGE:: ' + item)
                                    console.log(`from - to :: ${from} - ${to}`)
                                    console.log(`API PAGE:: ${apiPg}`)

                                    if (item >= to) {
                                        console.log('move to next api page')
                                        setApiPage(apiPg)
                                    }

                                    if (item < from) {
                                        console.log('move to previous api page')
                                        setApiPage(apiPg)
                                    }

                                    from = requestPerPageMap[apiPg].value.from
                                    to = requestPerPageMap[apiPg].value.to

                                    let page = item % localPages
                                    setLocalPage(page)
                                    console.log('-----------------')
                                }
                            }
                               className="page-link">{item + 1}</a>
                        </li>
                    ))}

                    <li>&nbsp;&nbsp;&nbsp;.&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;</li>

                    <li key={totalPages} className="page-item">
                        <a onClick={
                            () => setLocalPage(10)
                        }
                           className="page-link">{totalPages}</a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
