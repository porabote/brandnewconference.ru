import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const AccordionItemTab = (props) => {

  const setIsOpened = () => {
    props.setIsOpened(props.isOpened ? false : true);
  }

  return (
    <div className="prb-accordion__item__tab" onClick={setIsOpened}>
      {props.children}
      <ArrowDropDownIcon/>
    </div>
  );
};

export default AccordionItemTab;