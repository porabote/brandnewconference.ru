import React, {Children} from 'react';

const Radio = (props) => {
  return (
    <div
      className="form-item__radio-wrap"
      onChange={e => {

        props.formContext.setFieldValue(props.name, props.value)

        if (typeof props.onChange === "function") {
          props.onChange(e, props.formContext)
        }

      }}
    >
      {Children.map(props.children, child => {
        return React.cloneElement(child, {name: props.name, formContext: props.formContext})
      })}
    </div>
  );
};

export default Radio;