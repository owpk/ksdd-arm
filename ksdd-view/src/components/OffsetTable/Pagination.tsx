import { calculateParts } from "./utils/calculateParts";
import { OffsetPageable } from "./api/Table.types";
import { useState } from "react";

const calculateApiPage = (localPage: number, map: { key: number, value: OffsetPageable }[]): number => {
    let val = map.find(x => localPage >= x.value.from
        && localPage < x.value.to)
    return val ? val.key : 0;
}

let from: number = 0
let to: number

const Pagination = ({ totalPages, localPages, setLocalPage, setApiPage }: {
    totalPages: number
    localPages: number
    setLocalPage: (page: number) => void
    setApiPage: (page: number) => void
}) => {

    const [currentItemPage, setCurrentItemPage] = useState(0);

    let requestPerPageArray: OffsetPageable[] = calculateParts(totalPages, localPages)

    let requestPerPageMap: { key: number, value: OffsetPageable }[] =
        Array.from({ length: Math.ceil(totalPages / localPages) },
            (_, i) => {
                return { key: i, value: requestPerPageArray[i] }
            })

    const switchPage = (item: number) => {

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

    function onItemPageChaneAccepted(e): void {
        if (e.key === 'Enter') {
            switchPage(Number(e.target.value))
            console.log("PAGINATION PAGE:: " + e.target.value)
        }
    }

    function onItemPageChange(e): void {
        setCurrentItemPage(Number(e.target.value))
        console.log("PAGINATION PAGE:: " + currentItemPage)
    }

    if (!to)
        to = requestPerPageMap[0].value.to

    function onChangePage(func: (n: number) => number): void {
        let nextNum: number = func(currentItemPage)
        setCurrentItemPage(nextNum)
        console.log("PAGINATION PAGE:: " + nextNum)
        switchPage(nextNum)
    }

    return (
        <>
            <div className="w-25 p-3">
                <div className="input-group mb-3">
                    <button onClick={() => onChangePage(x => {
                        if (x > 0)
                            return x - 1
                        else return x
                    })}
                        className="btn btn-outline-secondary btn-sm" type="button">
                        prev
                    </button>
                    <input type="number"
                        value={`${currentItemPage == 0 ? '' : currentItemPage}`}
                        onChange={onItemPageChange}
                        onKeyDown={onItemPageChaneAccepted}
                        className="form-control"
                    />
                    <button onClick={() =>
                        onChangePage(x => {
                            if (x < totalPages - 1)
                                return x + 1
                            else return x
                        })}
                        className="btn btn-outline-secondary btn-sm"
                        type="button">
                        next
                    </button>
                    <button disabled className={"btn btn-secondary btn-sm"} >
                        total
                        <span className="badge badge-secondary">
                            {totalPages - 1}
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Pagination;
