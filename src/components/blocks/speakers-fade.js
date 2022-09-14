import React, {useState} from 'react';

const SpeakersFade = (props) => {

  const [itemLimit, setItemLimit] = useState(10);
  const [itemWidth, setItemWidth] = useState(160);
  const [itemHeight, setItemHeight] = useState(380);

  const speakers = props.data.slice(0, itemLimit);

  return (
    <div className="prb-slider__fade__container">

      <div className="prb-slider__navbar">
        <div className="prb-slider__title">
          <span>Спикеры</span>
          {/*<span style={{fontSize: '1.6rem'}}>состав спикеров дополняется</span>*/}
        </div>
      </div>


        <div className="prb-slider__items__fade">
          {speakers.map(speaker => {

            return(
              <div key={speaker.id}
                   className="prb-slider__item fade"
                   style={{
                     backgroundImage: `url(/images${speaker.avatar.uri})`,
              }}>
                <div className="prb-slider__item-text">
                  <div className="prb-slider__item-text__fio">{speaker.last_name} {speaker.name}</div>
                  <div className="prb-slider__item-text__desc">{speaker.post_name}</div>
                </div>
              </div>
            );
          })}

        </div>


      {itemLimit == 10 &&
        <div onClick={() => setItemLimit(100)} className="fade-panel-link">Показать еще</div>
      }
      {itemLimit > 10 &&
        <div onClick={() => setItemLimit(10)} className="fade-panel-link">Скрыть</div>
      }

    </div>
  );
};

export default SpeakersFade;