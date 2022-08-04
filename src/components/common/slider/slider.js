import React, {useEffect, useState, Children, useRef} from 'react';
import {SliderItem} from "@components/common/slider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.less';

const Slider = (props) => {

  useEffect(() => {

    let containerWidth = props.container.current.clientWidth ;
    if (containerWidth > 1440) containerWidth = 1440;
    setContainerWidth(containerWidth);

    let itemsOnPage = 5;
    if (window.innerWidth < 990) {
      itemsOnPage = 1
    }
    let itemW = parseInt(containerWidth / itemsOnPage);
    let itemH = parseInt(itemW * 1.68);

    setItemWidth(parseInt((containerWidth) / itemsOnPage));
    setItemHeight(itemH);
  }, []);

  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(190);
  const [itemHeight, setItemHeight] = useState(320);
  const [lineWidth, setLineWidth] = useState(320);

  const itemsWindow = useRef(null);
  const itemsRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);

  const handleArrowToLeft = () => {
console.log(88);
    setOffset(currentOffset => {

      let containerW = props.children.length * itemWidth;

      const newOffset = currentOffset - containerW;

      const maxOffset = -parseInt((props.children.length * itemWidth) - containerWidth);

      return Math.max(newOffset, maxOffset);
    });
  }

  const handleArrowToRight = () => {

    setOffset(currentOffset => {
      let containerW = props.children.length * itemWidth;
      const newOffset = currentOffset + containerW;console.log(containerW);
      return Math.min(newOffset, 0);
    });
  }

  return (
    <div
      className="prb-slider"
      style={{
        maxWidth: `${containerWidth}px`
      }}
    >
      <div className="prb-slider__container" ref={itemsWindow}>
        <div
          ref={itemsRef}
          className="prb-slider__items"
          style={{
            transform: `translateX(${offset}px)`

          }}
        >
          {React.Children.map(props.children, child => {

            let style = {
              height: '100%',
              minWidth: `${itemWidth - 10}px`,
              maxWidth: `${itemWidth - 10}px`,
              minHeight: `${itemHeight - 0}px`,
              maxHeight: `${itemHeight - 0}px`,
            };
            return React.cloneElement(child, {...child.props, style: style});
          })}
        </div>

      </div>

      <div className="prb-slider__line" style={{width: lineWidth}}></div>

      <div className="prb-slider__navbar">
        <div className="prb-slider__title">Спикеры</div>
        <div className="prb-slider__buttons">
          <div className="prb-slider-btn-left" onClick={handleArrowToRight}></div>
          <div className="prb-slider-btn-right" onClick={handleArrowToLeft}></div>
        </div>
      </div>

    </div>
  );
};

export default Slider;