import React from 'react';
import ArrowToDown from "./svg/arrow_to_down.svg";

const Anons = () => {

  const scrollToDown = () => {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div id="preview" className="main-page__anons">


      <div className="main-page__anons__container">

        <div className="main-page__anons__main-text">
          <div className="main-page__anons__main-text-text">

            <p className="main-page__anons__main-text-text__title">
              КОНФЕРЕНЦИЯ ПРО<br/>
              БИЗНЕС И МАРКЕТИНГ<br/>
              НОВОЙ ВОЛНЫ
            </p>

            <p>
            Бизнес и люди оказались в новом и не совсем понятном кино. У нас есть идеи, как жить дальше в этом сюжете.
            Обсудим вместе на ежегодной конференции dentsu в месте, где показывают главные премьеры сезона — в
            кинотеатре «Художественный».
            </p>
            <p>
            Мероприятие пройдет бесплатно в гибридном формате. Помимо премьеры на большом экране будет
            онлайн-трансляция. В офлайне количество мест ограничено.
            </p>
            <p>
            Конференция — важная веха и новый этап для всех нас. Покажем новую версию dentsu и видение рынка в его новой
            версии. Мы не будем в очередной раз обсуждать изменившуюся реальность, но дадим пользу и практику, нужную в
            моменте. Будет навигация для сборки стратегии 2023: маркетинговые и рекламные кейсы из нового времени;
            дискуссии вместе с рекламодателями, селлерами, медиа и маркетплейсами (спускайтесь в раздел Спикеры).
            </p>
          </div>
          <div className="main-page__anons__main-text-balls">
            <div className="main-page__anons__main-text-balls__big-ball"></div>
            <div className="main-page__anons__main-text-balls__middle-ball"></div>
            <div className="main-page__anons__main-text-balls__small-ball"></div>
          </div>
        </div>


      </div>


    </div>
  );
};

export default Anons;