import React from 'react';
import Datas from 'porabote/datas';

const TextArea = (props) => {

  let value = Datas.getValueByPath(props.name, props.formContext.values);
  if (!value) value = '';

  return (
    <div className={`form_item textarea`}>
      <div className="form-item__textarea-wrap">

          <textarea
            style={(props.areaStyle) ? props.areaStyle : {}}
            type="text"
            placeholder={props.placeholder}
            name={props.name}
            className={`form-item__textarea`}
            value={value}
            onChange={(e) => {
              props.formContext.setFieldValue(props.name, e.target.value)
            }}
            onKeyUp={(e) => {
              if (typeof props.onKeyUp === 'function') {
                props.onKeyUp(e)
              }
            }}
          >
          </textarea>
        <label className="form_item__label">{props.label}</label>
      </div>
    </div>
  );
};

export default TextArea;