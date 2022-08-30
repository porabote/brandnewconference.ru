import React from 'react';
import ArrowToDown from "./svg/arrow_to_down.svg";

const Anons = (props) => {

  if (!props.loading) {
    return <p>Data loading</p>
  }

  const scrollToDown = () => {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div id="preview" className="main-page__anons">


      <div className="main-page__anons__main-text-balls">
        <div style={{position: 'relative', width: '100px', height: '200px'}}>
          <div className="main-page__anons__main-text-balls__big-ball"></div>
          <div className="main-page__anons__main-text-balls__middle-ball"></div>
          <div className="main-page__anons__main-text-balls__small-ball"></div>
        </div>
      </div>

      <div className="main-page__anons__container">

        <div className="main-page__anons__main-text">
          <div className="main-page__anons__main-text-text" dangerouslySetInnerHTML={{__html: props.textBoxes[0].box_text}}>



          </div>
        </div>

      </div>


    </div>
  );
};

export default Anons;