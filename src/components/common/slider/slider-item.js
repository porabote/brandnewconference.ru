import React from 'react';

const SliderItem = (props) => {
  return React.cloneElement(props.children, {style: props.style, className: 'prb-slider__item'});
};

export default SliderItem;