import React, {Children} from 'react';

const Radio = (props) => {
  return (
    <div className="form-item__radio-wrap">
      {Children.map(props.children, child => {
        return React.cloneElement(child, {name: props.name, formContext: props.formContext})
      })}
    </div>
  );
};

export default Radio;