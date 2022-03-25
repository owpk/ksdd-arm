import Input from 'components/Input';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

let flt = [] as { key: string, value: string }[]

interface IInput {
  field: string
  fieldValue: string
}

export const Filter = ({ setFilter }: {
  setFilter: (filter: { key: string, value: string }[]) => void
}) => {

  const [fil_val, setFilterVal] = useState("")

  function addValue(evt) {
    console.log("ADDING EVENT VALUE")
    let val = evt.target.value
    setFilterVal(val)
  }

  function search() {
    if (fil_val.length > 0)
      flt.push({ key: "obj_id", value: fil_val })
    setFilter(flt)
  }

  function fillFlt(searchDefinition: string, value: string) {
    flt.push({ key: searchDefinition, value: value })
  }

  function clear() {
    flt = []
  }

  return (
    <>
      <div className={"btn btn-primary"} onClick={() => search()}>search</div>
      <div className={"btn btn-primary"} onClick={() => {
        clear();
        search()
      }}>clear
      </div>

      <form >
        <Input inputLabel={'Obj'} requestName={'Obj_id'} fillSearchQuery={function ({ key, value }: { key: any; value: any; }): void {
          throw new Error('Function not implemented.');
        } } />
      </form>
    </>
  )
}