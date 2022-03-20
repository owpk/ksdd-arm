import React, {useState} from 'react';

let flt = [] as { key: string, value: string }[]

export const Filter = ({setFilter}: {
    setFilter: (filter: { key: string, value: string } []) => void
}) => {

    const [fil_val, setFilterVal] = useState("")

    function addValue(evt) {
        console.log("ADDING EVENT VALUE")
        let val = evt.target.value
        setFilterVal(val)
    }

    function search() {
        if (fil_val.length > 0)
            flt.push({key: "obj_id", value: fil_val})
        setFilter(flt)
    }

    function clear() {
        flt = []
    }

    return (
        <>
            <input type="text" name={"obj_id"} onChange={addValue}/>
            <div className={"btn btn-primary"} onClick={() => search()}>search</div>
            <div className={"btn btn-primary"} onClick={() => {
                clear();
                search()
            }}>clear
            </div>
        </>
    )
}
