import React, {useRef} from 'react';
import {Slider, SliderItem} from "@components/common/slider";
import SpeakersFade from "./speakers-fade";

const Speakers = (props) => {

  const speakerContainer = useRef(null);

  return (
    <div ref={speakerContainer} className="main-page__speakers" id="speakers">

      <div className="main-page__speakers__container">

        <SpeakersFade data={props.data}></SpeakersFade>

        <Slider container={speakerContainer}>
          {props.data.map((speaker, index) => {

            let avatar = (speaker.avatar) ? `url("/images${speaker.avatar.uri}")` : '';

            return <SliderItem key={index} data={speaker} avatar={avatar}>

              <div className="prb-slider__item-text">
                <div className="prb-slider__item-text__fio">{speaker.last_name} {speaker.name}</div>
                <div className="prb-slider__item-text__desc">{speaker.post_name}</div>
              </div>

            </SliderItem>
          })}
        </Slider>
      </div>

    </div>
  );
};

export default Speakers;