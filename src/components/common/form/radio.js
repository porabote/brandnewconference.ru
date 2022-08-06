import React, {Children} from 'react';

const Radio = (props) => {

  const onChange = (e) => {console.log(props.props);
    props.formContext.setFieldValue(props.name, props.value)

    if (typeof props.onChange === "function") {
      props.onChange(e, props.formContext)
    }
  }

  return (
    <div
      className="form-item__radio-wrap"

    >
      {Children.map(props.children, child => {
        return React.cloneElement(child, {
          name: props.name,
          formContext: props.formContext,
          onChange: props.onChange || null
        })
      })}
    </div>
  );
};

export default Radio;