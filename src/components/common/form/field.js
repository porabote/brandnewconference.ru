import React, { Component } from 'react'
import { FormConsumer} from './form-context'

export default class Field extends Component {


    render(){

        let name = (typeof this.props.name != "undefined") ? this.props.name : this.props.children.props.name

        return(
            <FormConsumer>
                { (formContext) => React.cloneElement(this.props.children, { formContext, name }) }
            </FormConsumer>
        )
    }
}