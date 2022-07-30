import React from 'react';
import {Slider, SliderItem} from "@components/common/slider";

const Speakers = (props) => {

  return (
      <div id="speakers" className="main-page__speakers">
        <h2>Спикеры</h2>

        <Slider>
        {props.data.map((speaker, index) => {

          let avatar = (speaker.avatar) ? `url("/images${speaker.avatar.uri}")` : '';

          return(
            <SliderItem key={index}>
              <div className="prb-slider__item-photo" style={{backgroundImage: avatar}}>
              </div>
              <div className="prb-slider__item-text">
                <div className="prb-slider__item-text__fio">{speaker.last_name} {speaker.name}</div>
                <div className="prb-slider__item-text__desc">{speaker.post_name}</div>
              </div>
            </SliderItem>
          );
        })}
        </Slider>

      </div>
  );
};

export default Speakers;