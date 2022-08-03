import React, {useEffect, useState, Children, useRef} from 'react';
import {SliderItem} from "@components/common/slider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.less';

const Slider = (props) => {

  useEffect(() => {
    let containerWidth = props.container.current.clientWidth - 120;
    setContainerWidth(containerWidth);

    let itemsOnPage = 4;
    if (window.innerWidth < 990) {
      itemsOnPage = 1
    }
    setItemWidth(containerWidth/itemsOnPage);
  }, []);

  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const itemsWindow = useRef(null);

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);

  const handleArrowToLeft = () => {
    setOffset(currentOffset => {

      const newOffset = currentOffset - containerWidth;

      const maxOffset = -parseInt((props.children.length) * itemWidth - containerWidth);

      return Math.max(newOffset, maxOffset);
    });
  }

  const handleArrowToRight = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + containerWidth;
      return Math.min(newOffset, 0);
    });
  }

  return (
    <div
      className="prb-slider"
      style={{width: `${containerWidth}px`}}
    >
      <div className="prb-slider-btn-right" onClick={handleArrowToLeft}></div>

      <div className="prb-slider__container">
        <div
          ref={itemsWindow}
          className="prb-slider__items"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {React.Children.map(props.children, child => {

            let style = {
              height: '100%',
                minWidth: `${itemWidth - 10}px`,
                maxWidth: `${itemWidth - 10}px`,
            };
            return <SliderItem style={style} >{child}</SliderItem>
          })}
        </div>
      </div>
      <div className="prb-slider-btn-left" onClick={handleArrowToRight}></div>
    </div>
  );
};

export default Slider;