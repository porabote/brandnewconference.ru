import React from 'react'

class InputHidden extends React.Component {

    componentDidMount() {
        if (typeof this.props.formContext.values[this.props.name] == "undefined") {

            let value = this.props.defaultValue || '';

            this.props.formContext.setFieldValue(this.props.name, value, 'patch');
        }
    }

    render()
    {


        return (
            <input
                defaultValue={this.props.defaultValue || undefined}
                type="hidden"
                placeholder={this.props.placeholder}
                name={this.props.name}
                onChange={this.props.onChange}
            />
        )

    }

}

export default InputHidden