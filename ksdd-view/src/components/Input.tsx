import React from "react"

interface Input {
    getValue(): string
}

interface InputProps {
    inputLabel: string
    requestName: string
    fillSearchQuery: ({ key, value }) => void
}

interface InputState {
    value: string
}

export default class InputComponent
    extends React.Component<InputProps>
    implements Input {

    constructor(props: InputProps) {
        super(props)
    }

    state: InputState = {
        value: ""
    }

    inputCallback(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: e.target.value })
    }

    public getValue(): string {
        return this.state.value
    }

    render() {
        return (
            <>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">{this.props.inputLabel}</span>
                    </div>
                    <input onChange={this.inputCallback} />
                </div>
            </>
        )
    }
}