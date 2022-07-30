import React from 'react'
import Datas from 'porabote/datas'
import { TooltipForm } from 'porabote/tooltip'

class InputBare extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isTooltipDisplayed: 'none',
            tooltip: false
        }
    }

    render() {

        let value = Datas.getValueByPath(this.props.name, this.props.formContext.values)

        return(
            <span style={{position: 'relative'}}>
                {this.state.tooltip && <TooltipForm display={this.state.isTooltipDisplayed}></TooltipForm>}
                <input
                    disabled={this.props.disabled || false}
                    type={this.props.type || 'text'}
                    value={value}
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    onChange={(e) => {

                        this.props.formContext.setFieldValue(this.props.name, e.target.value)

                        if (typeof this.props.onChange === "function") {

                            this.props.onChange(e, {
                                name: this.props.name,
                                value: e.target.value,
                                formContext: this.props.formContext
                            })
                        }
                    }}
                    onMouseEnter={() => {
                        this.setState({
                            isTooltipDisplayed: 'block'
                        })
                    }}
                    onMouseLeave={() => {
                        this.setState({
                            isTooltipDisplayed: 'none'
                        })
                    }}
                    onKeyUp={(e) => {
                        if (typeof this.props.onKeyUp === "function") {
                            this.props.onKeyUp(e, {
                                name: this.props.name,
                                value: e.target.value,
                                formContext: this.props.formContext
                            })
                        }
                    }}
                    className={this.props.className || 'input-mini'}
                    autoComplete='off'
                    style={this.props.style || {}}
                />
            </span>
        )
    }

}

export default InputBare