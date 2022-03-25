import React, { FC, useState } from "react"

interface InputProps {
    inputLabel: string
    requestName: string
    fltMapRef: Map<string, { key: string, value: string }>
}

export const Input: FC<InputProps> = (props: InputProps) => {

    const [inputVal, setInputValue] = useState<string>('')

    function inputCallback(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
        props.fltMapRef.set(
            props.requestName, { key: props.requestName, value: inputVal })
    }

    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">{props.inputLabel}</span>
                </div>
                <input onChange={inputCallback} />
            </div>
        </>
    )
}