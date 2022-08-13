import React from 'react';

const AccordionItemBody = (props) => {
  return (
    <div dangerouslySetInnerHTML={{__html: props.children}} className={props.isOpened ? "prb-accordion__item__body active" : "prb-accordion__item__body"}>
    </div>
  );
};

export default AccordionItemBody;