import React from 'react';
import Mail from './svg/mail.svg';
import Telegram from './svg/telegram.svg';

const Contacts = () => {
  return (
    <div id="contacts" className="main-page__contacts">
      <div>
        <p className="main-page__contacts__head">Политика</p>
        <p className="main-page__contacts__item">

        </p>
      </div>

      <div></div>

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
        <p>
          <a href="mailto:support@brandnewconference.ru">
            <img src={Mail} className="mail-icon"/>
            Мы на связи support@brandnewconference.ru</a>
        </p>
      </div>
    </div>
  );
};

export default Contacts;