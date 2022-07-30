import React from 'react'
import Datas from 'porabote/datas'

const TextareaClear = props => {

    let value = Datas.getValueByPath(props.name, props.formContext.values);
    if (!value) value = '';

    return(
        <textarea
            className={props.className}
            value={value}
            placeholder={props.placeholder || ''}
            onChange={(e) => {
                props.formContext.setFieldValue(props.name, e.target.value)
            }}
        >
        </textarea>
    )
}

class Textarea extends React.Component {

    state = {
        grid: (this.props.grid) ? `form-item ${this.props.grid}}` : "form-item grid",
        label: (typeof this.props.label != 'undefined' && this.props.label) ?
            <label className="form_item__label">{this.props.label}</label> : ''
    }

    componentDidMount() {
        if (typeof this.props.formContext.values[this.props.name] == "undefined") {
            this.props.formContext.setFieldValue(this.props.name, '', 'patch');
        }
    }

    render() {

        if (typeof this.props.clear != "undefined") {
            return <TextareaClear {...this.props} />
        }

        let value = Datas.getValueByPath(this.props.name, this.props.formContext.values);
        if (!value) value = '';

        return (
            <div className={this.state.grid}>
                {this.state.label}
                <div className="form-item__textarea-wrap">
                    <textarea
                        type="text"
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        className={this.props.class || 'form-item__textarea'}
                        value={value}
                        onChange={(e) => {
                            this.props.formContext.setFieldValue(this.props.name, e.target.value)
                        }}
                        onKeyUp={(e) => {
                            if(typeof this.props.onKeyUp === 'function') {
                                this.props.onKeyUp(e)
                            }
                        }}
                    >
                    </textarea>
                </div>
            </div>
        )
    }

}

export default Textarea