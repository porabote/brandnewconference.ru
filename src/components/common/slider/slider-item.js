import React, {useState} from 'react';

const SliderItem = (props) => {

  const [itemClass, setItemClass] = useState('');

  return(
    <div
      changedTouches={(e) => {
        alert(88);
        setItemClass(prevClass => (prevClass == 'active' ? 'inactive' : 'active'));
      }}
      // onMouseLeave={(e) => {
      //   alert(99);
      // }}
      className={`prb-slider__item ${itemClass}`}
      style={{backgroundImage: props.avatar, ...props.style}}>
      {props.children}
    </div>    
  ); 
};

export default SliderItem;