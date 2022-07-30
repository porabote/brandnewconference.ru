import React, {useEffect, useState, Children, useRef} from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.less';

const Slider = (props) => {

  const ITEM_WIDTH = 700;

  const itemsWindow = useRef(null);

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);

  const handleArrowToRight = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + ITEM_WIDTH;
      return Math.min(newOffset, 0);
    });
  }

  const handleArrowToLeft = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - ITEM_WIDTH;
      const maxOffset = -parseInt(itemsWindow.current.clientWidth - 300);
      return Math.max(newOffset, maxOffset);
    });
  }

  return (
    <div
      className="prb-slider"
    >
      <div className="prb-slider-btn-right" onClick={handleArrowToLeft}></div>

      <div
        className="prb-slider__container"
      >
        <div
          ref={itemsWindow}
          className="prb-slider__items"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {React.Children.map(props.children, child => {
            return React.cloneElement(child, {
              style: {
                height: '100%',
                minWidth: `${ITEM_WIDTH}px`,
                maxWidth: `${ITEM_WIDTH}px`,
              }
            });
          })}
        </div>
      </div>
      <div className="prb-slider-btn-left" onClick={handleArrowToRight}></div>
    </div>
  );
};

export default Slider;