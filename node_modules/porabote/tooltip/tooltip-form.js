import React from 'react'

const TooltipForm = (props) => {

    return(
        <div className="tooltip-form" style={{display: props.display}}>
            {props.children}
        </div>
    )
}

export default TooltipForm