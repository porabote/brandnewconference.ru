import React from 'react'

const Option = (props) => {
  return (
    <div
      onMouseDown={(e) => {
        props.afterSelectCallback(e);
      }}
      value={props.value}
      className="form-item__select__drop-link"
    >
      {props.children}
    </div>
  )
}

export default Option