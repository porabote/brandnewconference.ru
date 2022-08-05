import React, {useState, useEffect} from 'react';
import TopBannerSVG from "./svg/top-banner.svg";
import ArrowToDown from "./svg/arrow_to_down.svg";
import "./style/departure-board.less"

const TopBanner = () => {

  useEffect(() => {
    //initBanner();
  });

  const scrollToDown = () => {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div className="banner-block">
      {/*<div className="banner-block__title">Новая конференция dentsu</div>*/}
      {/*<img className="banner-block__svg-banner" src={TopBannerSVG}/>*/}
      <div style={{width: '710px', height: '280px', border: '0px solid red', zIndex: '10000000'}}>
        <iframe src="https://brandnewconference.ru/images/daprture-board.html" height="100%" width="100%"/>
      </div>
      <img className="arrow-to-down" src={ArrowToDown} onClick={scrollToDown}/>
    </div>
  );
};

export default TopBanner;