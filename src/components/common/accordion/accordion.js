import React from 'react';
import "./style.less";

const Accordion = (props) => {

  return (
    <div>
      {props.children.map((child, index) => {
        return React.cloneElement(child, {key: index});
      })}
    </div>
  );
};

export default Accordion;