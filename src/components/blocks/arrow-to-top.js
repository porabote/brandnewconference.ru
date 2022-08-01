import React, {useState, useEffect} from 'react';
import ArrowToTopSvg from './svg/arrow_to_top.svg';

const ArrowToTop = () => {

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    
    const scrollToTop = () => {
      arrowMenuPositionClass((window.scrollY > window.innerHeight) ? '' : 'hide');
    }
    window.addEventListener('scroll', scrollToTop);
    
    return () => {
      window.removeEventListener('scroll', scrollToTop);
    };
    
  }, []);

  const [arrowPositionClass, arrowMenuPositionClass] = useState('hidden');

  return (
    <React.Fragment>
      <img className={`arrow-to-top ${arrowPositionClass}`} src={ArrowToTopSvg} onClick={scrollToTop}/>
    </React.Fragment>
  );
};

export default ArrowToTop;