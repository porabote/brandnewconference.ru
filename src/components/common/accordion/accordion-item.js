import React, {useState} from 'react';

const AccordionItem = (props) => {

  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      {React.cloneElement(props.children[0], {isOpened, setIsOpened})}
      {React.cloneElement(props.children[1], {isOpened})}
    </div>
  );
};

export default AccordionItem;