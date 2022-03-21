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

  function clear() {
    flt = []
  }

  const { register, handleSubmit } = useForm<IInput>();

  const onSubmit:SubmitHandler<IInput> = (data) => {
    flt = [{key: "obj_id", value: data.field}]
    setFilter(flt)
  }


  return (
    <>
      <div className={"btn btn-primary"} onClick={() => search()}>search</div>
      <div className={"btn btn-primary"} onClick={() => {
        clear();
        search()
      }}>clear
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>


        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">@</span>
          </div>
          <input {...register("field")} />
        </div>

        <input type="submit" />
      </form>

    </>
  )
}
