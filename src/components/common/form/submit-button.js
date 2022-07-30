import React, { cloneElement } from 'react'
import { FormConsumer } from './form-context'
import { Button } from './'

const SubmitButton = props => {

    return(
        <FormConsumer>
            { formContext => {

                const submitHandler = (e) => {
                    if(typeof props.submitForm == 'function') {
                        props.submitForm(formContext)
                    } else {
                        formContext.submitForm()
                    }

                    if (typeof props.children.props.onClick == "function") {
                        props.children.props.onClick(e);
                    }
                }

                return(
                    React.Children.map(props.children, (child, key) => {
                        return React.cloneElement(child, { onClick: submitHandler, ...props });
                    })
                )
            }}
        </FormConsumer>
    )

}

export default SubmitButton