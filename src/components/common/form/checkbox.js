import React from 'react'
import Datas from 'porabote/datas'


class Checkbox extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        checked: this.props.initChecked || false,
        value: this.props.value,
        htmlFor: `checkbox-${Math.random()}`,
        removeIsUnchecked: this.props.removeIsUnchecked || false
      }
    }

    render() {

        let disabled = this.props.disabled ? this.props.disabled : false;

        if (typeof disabled === "function") {
            disabled = disabled(value);
        }

        return (
            <div className="form-item__checkbox-wrap">
                <input
                    type="checkbox"
                    id={this.state.htmlFor}
                    className={ this.props.class || 'form-item__checkbox'}
                    disabled={disabled}
                    name={this.props.name}
                    value={this.state.value}
                    checked={this.state.checked}
                    onChange={e => {

                        this.setState({
                            checked: e.target.checked
                        })

                        let status = (e.target.checked) ? 1 : 0
console.log(this.state.value);
                        if (status) {
                            this.props.formContext.setFieldValue(this.props.name, this.state.value)
                        } else {
                            this.props.formContext.setFieldValue(this.props.name, '', 'delete')
                        }


                        if (typeof this.props.onChange === "function") {
                            this.props.onChange(e, this.props.formContext)
                        }

                    }}
                />
                <label
                  htmlFor={this.state.htmlFor}
                  dangerouslySetInnerHTML={{__html: this.props.label}}
                ></label>
            </div>
        )
    }

}

export default Checkbox