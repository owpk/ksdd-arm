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
            switchPage(e.target.value)
            console.log("PAGINATION PAGE:: " + e.target.value)
        }
    }

    function onItemPageChange(e): void {
        setCurrentItemPage(e.target.value)
        console.log("PAGINATION PAGE:: " + currentItemPage)
    }

    if (!to)
        to = requestPerPageMap[0].value.to

    function onClickChangePage(sign: boolean): void {
        if (!sign) {
            if (currentItemPage > 0)
                setCurrentItemPage(currentItemPage - 1)
        } else {
            if (currentItemPage < totalPages)
                setCurrentItemPage(currentItemPage + 1)
        }
        console.log("PAGINATION PAGE:: " + currentItemPage)
        switchPage(currentItemPage)
    }

    return (
        <>
            <div>
                <div className="input-group mb-3">
                    <button onClick={() => onClickChangePage(false)}
                        className="btn btn-outline-secondary btn-sm" type="button">
                        prev
                    </button>
                    <input type="text"
                        value={currentItemPage}
                        onChange={onItemPageChange}
                        onKeyDown={onItemPageChaneAccepted}
                        className="form-control" placeholder=""
                        aria-label="page" aria-describedby="page"
                    />
                    <button onClick={() => onClickChangePage(true)}
                        className="btn btn-outline-secondary btn-sm"
                        type="button">
                        next
                    </button>
                </div>

            </div>
        </>
    )
}

export default Pagination;
