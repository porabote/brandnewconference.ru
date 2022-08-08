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
              Есть стойкое ощущение, что бизнес и люди оказались в новом кино с не совсем понятным сценарием. У нас есть идеи, как в этом сюжете жить дальше. Обсудим вместе на ежегодной конференции dentsu там, где случаются главные премьеры киносезона — в кинотеатре «Художественный».
            </p>
            <p>
              brand new conference 2022 — важная веха и целый этап для всех нас. Мы поговорим о том, как изменились и продолжают меняться рынок и экономика, клиентский запрос и медиаландшафт, а еще покажем новую версию самих себя. Обещаем, что не будем в очередной раз упоминать «новую реальность» — сфокусируемся на вполне конкретной пользе и практике, которые нужны в моменте. Будут навигация для сборки стратегии 2023, маркетинговые и рекламные кейсы из нового времени, а также дискуссии вместе с рекламодателями, селлерами, медиа и маркетплейсами о том, как быть дальше.
            </p>
            <p>
              Мероприятие пройдет бесплатно в гибридном формате. Помимо премьеры на большом экране «Художественного» будет онлайн-трансляция. В офлайне количество мест ограничено.
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