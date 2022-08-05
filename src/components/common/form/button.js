import React from 'react'

const Button = props => {

    const state = {
        formValid : true,
        className: props.className || 'on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white'
    }

    return (
        <button
            className={state.className}
            type={props.type || 'button'}
            style={props.style}
            disabled={props.disabled || false}
            onClick={ e => {

                if(typeof props.onClick === "function") {
                    props.onClick(e, props.formContext)
                }

                if (props.type == "submit") {
                    props.formContext.submitForm(props.formContext)
                }

            }}
            >
            {props.text}
          {props.children.props.children}
            {!React.isValidElement(props.children) &&
                props.children
            }
        </button>
    )

}

export default Button