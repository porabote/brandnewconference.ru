import React from 'react';

const SliderItem = (props) => {
  return (
    <div className="prb-slider__item">
      {props.children}
    </div>
  );
};

export default SliderItem;