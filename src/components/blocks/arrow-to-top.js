import React, {useState, useEffect} from 'react';
import ArrowToTopSvg from './svg/arrow_to_top.svg';

const ArrowToTop = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {

    // const handleScroll = event => {
    //
    //   // let pixelsInPercent = mainBlock.current.offsetHeight / 100;
    //   // let topLineWidth = parseInt(window.scrollY /pixelsInPercent);
    //   // setTopLineWidth(`${topLineWidth}%`);
    //
    //   setMenuPositionClass((window.scrollY < 600) ? 'picked' : 'fixed');
    //   let menuPositionClass = (window.scrollY)
    //
    // };
    // window.addEventListener('scroll', handleScroll);
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };

  }, []);

  const [arrowPositionClass, arrowMenuPositionClass] = useState('hidden2');

  return (
    <React.Fragment>
      <img className={`arrow-to-top ${arrowPositionClass}`} src={ArrowToTopSvg} onClick={scrollToTop}/>
    </React.Fragment>
  );
};

export default ArrowToTop;