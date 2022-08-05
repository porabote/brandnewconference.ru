import React, {useRef} from 'react';
import {Slider, SliderItem} from "@components/common/slider";

const Speakers = (props) => {

  const speakerContainer = useRef(null);

  return (
    <div ref={speakerContainer} className="main-page__speakers">

      <div className="main-page__speakers__container" id="speakers">
        <Slider container={speakerContainer}>
          {props.data.map((speaker, index) => {

            let avatar = (speaker.avatar) ? `url("/images${speaker.avatar.uri}")` : '';

            return <SliderItem key={index} data={speaker} avatar={avatar}>

              <div className="prb-slider__item-text">
                <div className="prb-slider__item-text__fio">{speaker.last_name} {speaker.name}</div>
              </div>

              <div className="prb-slider__item-text__desc">{speaker.post_name}</div>

            </SliderItem>
          })}
        </Slider>
      </div>

    </div>
  );
};

export default Speakers;