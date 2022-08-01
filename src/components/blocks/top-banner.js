import React, {useState, useEffect} from 'react';
import TopBannerSVG from "./svg/top-banner.svg";
import ArrowToDown from "./svg/arrow_to_down.svg";

const TopBanner = () => {

  const scrollToDown = () => {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div className="banner-block">
      <div className="banner-block__title">Новая конференция dentsu</div>
      <img className="banner-block__svg-banner" src={TopBannerSVG}/>
      <img className="arrow-to-down" src={ArrowToDown} onClick={scrollToDown}/>
    </div>
  );
};

export default TopBanner;