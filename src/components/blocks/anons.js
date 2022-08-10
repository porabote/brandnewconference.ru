import React from 'react';
import ArrowToDown from "./svg/arrow_to_down.svg";

const Anons = () => {

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
          <div className="main-page__anons__main-text-text">

            <p className="main-page__anons__main-text-text__title">
              brand new conference 2022:<br/>
              конференция про бизнес<br/>
              и маркетинг новой волны
            </p>

            <p>Главное слово осенней конференции dentsu — польза. Регулирование рекламной отрасли, ушедшие и новые технологии, контент и креаторство, e-commerce и продажи, реклама и пользовательское внимание — мы начнём сезон с максимально предметного разговора о том, как подойти к планированию 2023 года на фоне меняющихся на глазах рынка, экономики, клиентского запроса и медиаландшафта.
            </p>
            <p>
              Будут новые продукты и инструменты, аналитика и честная попытка заглянуть в будущее, а также беседы с селлерами, рекламодателями медиа и маркетплейсами о том, как бизнесу в этом будущем твёрдо стоять на ногах.
            </p>
            <p>
              Будет и несколько премьер — приготовьтесь к тому, что 14 сентября в кинотеатре «Художественный» мы покажем очень интересное кино.
            </p>
            <p>
              <i>(Мероприятие пройдет бесплатно в гибридном формате. Помимо премьеры на большом экране «Художественного» будет онлайн-трансляция. В офлайне количество мест ограничено)</i>
            </p>
          </div>
        </div>

      </div>


    </div>
  );
};

export default Anons;