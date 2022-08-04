import React from 'react';
//React.cloneElement(props.children, {style: props.style, className: 'prb-slider__item'});
const SliderItem = (props) => {
  return(
    <div className="prb-slider__item" style={{backgroundImage: props.avatar, ...props.style}}>
      {props.children}
    </div>    
  ); 
};

export default SliderItem;