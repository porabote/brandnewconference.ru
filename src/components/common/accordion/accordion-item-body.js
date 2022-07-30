import React from 'react';

const AccordionItemBody = (props) => {
  return (
    <div className={props.isOpened ? "prb-accordion__item__body active" : "prb-accordion__item__body"}>
      {props.children}
    </div>
  );
};

export default AccordionItemBody;