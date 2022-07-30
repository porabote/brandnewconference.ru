import React from 'react'

const GridCell = (props) => {

    return (
        <span className="grid__item">
            {props.children}
        </span>
    )
}

export default GridCell