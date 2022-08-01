import React, {useRef} from 'react';
import {Slider} from "@components/common/slider";

const Speakers = (props) => {

  const speakerContainer = useRef(null);

  return (
    <div ref={speakerContainer} id="speakers" className="main-page__speakers">
      <h2>Спикеры</h2>

      <div className="main-page__speakers__container">
        <Slider container={speakerContainer}>
          {props.data.map((speaker, index) => {

            let avatar = (speaker.avatar) ? `url("/images${speaker.avatar.uri}")` : '';

            return (
              <div key={index}>
                <div className="prb-slider__item-photo" style={{backgroundImage: avatar}}>
                </div>
                <div className="prb-slider__item-text">
                  <div className="prb-slider__item-text__fio">{speaker.last_name} {speaker.name}</div>
                  <div className="prb-slider__item-text__desc">{speaker.post_name}</div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

    </div>
  );
};

export default Speakers;