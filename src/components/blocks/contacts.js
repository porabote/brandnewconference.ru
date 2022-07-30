import React from 'react';
import Mail from './svg/mail.svg';
import Telegram from './svg/telegram.svg';

const Contacts = () => {
  return (
    <div id="contacts" className="main-page__contacts">
      <h2>Контакты</h2>
      <p style={{fontSize: '18px'}}>
        <img src={Mail} className="mail-icon"/>
        Мы на связи <a href="mailto:support@brandnewconference.ru">support@brandnewconference.ru</a>
      </p>

      <p style={{fontSize: '18px', marginTop: '10px'}}>
        <img src={Telegram} className="vk-icon"/>
        Анонсы и материалы конференции в телеграм-канале <a href="https://t.me/dentsurussia" target="_blank">
        dentsu insights
      </a>
      </p>

    </div>
  );
};

export default Contacts;