import React, {useState, useEffect} from 'react';

const RadioInput = (props) => {

  // useEffect(() => {
  //   setId(`radio_item_${Math.floor(Math.random() * 1000)}`);
  // });
  const [id, setId] = useState(`radio_item_${Math.floor(Math.random() * 1000)}`);

  let isChecked = (props.formContext.values[props.name] == props.value) ? 'checked' : '';

  return (
    <div className="form-item__radio">
      <input
        id={id}
        name={props.name}
        type="radio"
        checked={isChecked}
        value={props.value}
        onChange={e => {

          props.formContext.setFieldValue(props.name, props.value)

          if (typeof props.onChange === "function") {
            props.onChange(e, props.formContext)
          }

        }}
      />
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

export default RadioInput;