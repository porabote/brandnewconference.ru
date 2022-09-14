import React, {useEffect, useState, Children, useRef} from 'react';
import {SliderItem} from "@components/common/slider";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.less';

const Slider = (props) => {

  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollAriaWidth, setScrollAriaWidth] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(itemsPerPage);
  const [itemWidth, setItemWidth] = useState(190);
  const [itemHeight, setItemHeight] = useState(320);
  const [indicatorPercents, setIndicatorPercents] = useState(0);
  const [offset, setOffset] = useState(0);

  const itemsWindow = useRef(null);
  const itemsRef = useRef(null);

  const setSliderSizes = () => {

    let viewportWidth = props.container.current.clientWidth;
    if (viewportWidth > 1440) viewportWidth = 1440;
    setViewportWidth(viewportWidth);

    let itemsPerPage = 5;
    if (window.innerWidth < 768) {
      itemsPerPage = 1
    } else if (window.innerWidth <= 1024) {
      itemsPerPage = 3
    }

    // Calc width and height ItemDiv
    let itemW = parseInt(viewportWidth / itemsPerPage);
    setItemWidth(parseInt((viewportWidth) / itemsPerPage));
    let itemH = parseInt(itemW * 1.68);
    setItemHeight(itemH);

    let scrollAriaWidth = props.children.length * itemW;
    setScrollAriaWidth(scrollAriaWidth);

    // Set width of indicator;
    let indicatorPercent = parseInt(Math.abs(viewportWidth)/(scrollAriaWidth/100));
    setIndicatorPercents(indicatorPercent);
  }


  useEffect(() => {
    setSliderSizes();
  }, [props.children]);


  const handleArrowToRight = () => {

    setOffset((currentOffset) => {

      //let currentOffset = -parseInt(itemsRef.current.style.transform.replace(/\D/g,''));

      let newOffset = currentOffset - viewportWidth;
      const maxOffset = -parseInt(scrollAriaWidth - viewportWidth);
      newOffset = Math.max(newOffset, maxOffset)

      let pixelsInPercent = scrollAriaWidth/100;
      let incIndicatorPercent = parseInt(viewportWidth/pixelsInPercent);
      setIndicatorPercents(Math.min(indicatorPercents + incIndicatorPercent, 100));

      return newOffset;
    });
  }

  const handleArrowToLeft = () => {

    setOffset((currentOffset) => {

      let newOffset = currentOffset + viewportWidth;

      let pixelsInPercent = scrollAriaWidth/100;
      let incIndicatorPercent = parseInt((viewportWidth)/pixelsInPercent);
      let minIndicatorPercent = parseInt(Math.abs(viewportWidth)/(scrollAriaWidth/100));

       let newPercent = Math.max(indicatorPercents - Math.abs(incIndicatorPercent), minIndicatorPercent);
       setIndicatorPercents(newPercent);

      return Math.min(newOffset, 0);
    });
  }

  return (
    <div
      className="prb-slider"
      style={{
        maxWidth: `${viewportWidth}px`
      }}
    >
      <div className="prb-slider__navbar">
        <div className="prb-slider__title">
          <span>Спикеры</span>
          {/*<span style={{fontSize: '1.6rem'}}>состав спикеров дополняется</span>*/}
        </div>
        <div className="prb-slider__buttons">
          <div className="prb-slider-btn-left" onClick={handleArrowToLeft}></div>
          <div className="prb-slider-btn-right" onClick={handleArrowToRight}></div>
        </div>
      </div>
      
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

      <div className="prb-slider__line" style={{width: `${indicatorPercents}%`}}></div>
      
    </div>
  );
};

export default Slider;