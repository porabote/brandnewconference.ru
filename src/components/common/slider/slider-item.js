import React, {useState} from 'react';

const SliderItem = (props) => {

  const [itemClass, setItemClass] = useState('');

  const toggleCardInfo = () => {

  }

  return(
    <div
      onClick={(e) => {
        setItemClass(prevClass => (prevClass == 'active' ? '' : 'active'));
      }}
      className={`prb-slider__item ${itemClass}`}
      style={{backgroundImage: props.avatar, ...props.style}}>
      {props.children}
    </div>    
  ); 
};

export default SliderItem;