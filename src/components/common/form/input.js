import React, {useRef} from "react";
import Datas from "porabote/datas";

const Input = props => {

  const input = useRef(null);

  const inputType = props.type || 'text';

  const htmlFor = `${inputType}-${Math.random()}`;

  let value = Datas.getValueByPath(props.name, props.formContext.values);
  if (!value) value = "";

  let disabled = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(props.formContext.values);
  }

  const classExtra = props.classExtra || '';
  let label = (typeof props.label != "undefined") ?
    <label htmlFor={htmlFor} className={`form_item__label ${classExtra}`}>{props.label}</label> : '';

  const handleClick = (e) => {
    input.current.select();
  }


  return (
    <div className={`form_item ${classExtra}`}>
      <div className="form_item__input_wrap" onDoubleClick={handleClick}>
        <input
          ref={input}
          type={inputType}
          placeholder={props.placeholder || " "}
          id={htmlFor}
          name={props.name}
          value={value}
          disabled={disabled}
          onClick={() => {}}
          onDoubleClick={handleClick}
          onChange={e => {
            let value = e.target.value;

            if (typeof props.mask == "function") {
              value = props.mask(value);
            }
            props.formContext.setFieldValue(props.name, value);
          }}
          className={props.class || 'form_item__text'}
          autoComplete="off"

        />
        {label}
      </div>
    </div>
  )

}

export default Input