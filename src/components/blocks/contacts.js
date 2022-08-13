import React from 'react';
import Mail from './svg/mail.svg';
import Telegram from './svg/telegram.svg';
import Archive from "@assets/svg/archive.svg"

const Contacts = () => {
  return (
    <div id="contacts" className="main-page__contacts">
      {/*<div>*/}
      {/*  <p className="main-page__contacts__head">Политика</p>*/}
      {/*  <p className="main-page__contacts__item">*/}

      {/*  </p>*/}
      {/*</div>*/}

      <div className="main-page__contacts__container">

        <div>
          <p className="main-page__contacts__head">Контакты</p>
          <p className="main-page__contacts__item">
            <a href="https://t.me/dentsurussia" target="_blank">
              <img src={Telegram} className="vk-icon"/>
              Анонсы и материалы конференции
              в телеграм-канале
              dentsu insights
            </a>
          </p>
          <p className="main-page__contacts__item">
            <a href="mailto:support@brandnewconference.ru">
              <img src={Mail} className="mail-icon"/>
              Мы на связи support@brandnewconference.ru</a>
          </p>

          <div className="btn btn-outline-dark">
            <a className="arrow-icon" target="_blank" href="https://dentsu-conf.ru/archive">Архив</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacts;