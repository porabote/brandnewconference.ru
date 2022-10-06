import React, {useState, useEffect} from 'react';
import TopBannerSVG from "./svg/top-banner.svg";
import ArrowToDown from "./svg/arrow_to_down.svg";
import RegArrowSvg from "./svg/main-page__anons__registration.svg";
import "./style/departure-board.less";
import DepartureBoard from "@components/common/departure-board";

const TopBanner = () => {

  useEffect(() => {
    //initBanner();
  });
  //
  // const scrollToDown = () => {
  //   window.scrollTo(0, 800);
  // }

  return (
    <div className="banner-block">

      <div className="banner-block__container">



        <div className="big_ball"></div>

        <div className="departure-board-container">
          <DepartureBoard/>
        </div>
        <div className="main-page__anons__block_date">20.09.2022</div>
        <div className="main-page__anons__block_time">10:00-16:30</div>
        {/*<a href="#registration" className="main-page__anons__registration">*/}
        {/*  РЕГИСТРАЦИЯ*/}
        {/*  <img src={RegArrowSvg}/>*/}

        {/*</a>*/}

        <div className="main-page__anons__address">
          <p>Офлайн в кинотеатре «Художественный»</p>
          <p className="main-page__anons__address__title">Онлайн на всех экранах</p>
        </div>

      </div>

      <a href="#preview"><img className="arrow-to-down" src={ArrowToDown}/></a>
    </div>
  );
};

export default TopBanner;