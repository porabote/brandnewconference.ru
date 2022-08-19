import React, {useEffect, useState, useRef} from "react";
import {useDispatch} from "react-redux";
import Api from "@services";
import "@styles";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import {openModal} from "@components/common/modal";
import Registration from "@components/blocks/registration";
import Topnav from "@components/blocks/topnav";
import Speakers from "@components/blocks/speakers";
import Anons from "@components/blocks/anons";
import Faq from "@components/blocks/faq";
import Contacts from "@components/blocks/contacts";
import TopBanner from "@components/blocks/top-banner";
import ArrowToTop from "@components/blocks/arrow-to-top";
import DepartureBoard from "@components/common/departure-board";
import Logo from "@assets/svg/logo.svg";
import RegistrationNotices from "@components/blocks/registration-notices";

const MainPage = () => {

  useEffect(() => {

    inactivityTime();

    const params = new URLSearchParams(window.location.search);

    let userId = params.has('userid') ? params.get('userid') : null;

    Api.get(`/api/landing/get/?userId=${userId}`)
      .then((resp) => {
        if (resp.data.hash) {
          setPartFormat(resp.data.hash.part_format);
          setHash(resp.data.hash.hash);
        } else if (userId) {

          dispatch(openModal(<RegistrationNotices>
            <a href="#registration"><b>Что-то пошло не так</b></a>. Похоже, эта ссылка не работает.
            Перейдите по уникальной ссылке из персонального приглашения или зарегистрируйтесь через
            <a href="#registration"> форму на сайте </a>.
            Если закралась ошибка, свяжитесь с нами
            <a href="mailto:support@brandnewconference.ru"> support@brandnewconference.ru</a>
          </RegistrationNotices>, 'Регистрация'));

        }

        setSpeakers(resp.data.speakers);
        setFaqs(resp.data.faqs);
        setLoading(true);
      });
  }, []);

  const mainBlock = useRef(null);

  const [topLineWidth, setTopLineWidth] = useState(0);
  const [speakers, setSpeakers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [partFormat, setPartFormat] = useState(null);
  const [hash, setHash] = useState(null);
  const [loading, setLoading] = useState(false);

  const MsgAboutTelegram = () => {

    let shareText = encodeURIComponent('Brand new conference — конференция про бизнес и маркетинг новой волны.' +
      ' Покажем новую версию dentsu и дадим пользу для сборки стратегии 2023');
    let shareUrl = encodeURIComponent('https://brandnewconference.ru');

    return(
      <div>
        Кстати, у нас есть телеграм-канал
        <a href="https://t.me/dentsurussia" target="_blank"> <b>dentsu insights</b> </a>.
        Подписывайтесь на него,
        чтобы получать анонсы и материалы конференции, но не только. 
        Это наше микро-медиа для маркетологов, в котором регулярно выкладываем аналитику, 
        кейсы, разборы и вдохновляющие посты.
      </div>
    );
  }

  const inactivityTime = function () {
    var time;
    let isTelegramMsgShowed = false;

    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;     // touchpad clicks
    document.addEventListener('scroll', resetTimer, true);

    function showNotice() {
      isTelegramMsgShowed = true;
      dispatch(openModal(<MsgAboutTelegram/>, 'Кстати, у нас есть Telegram'));
    }

    function resetTimer() {
      clearTimeout(time);
      if (!isTelegramMsgShowed) time = setTimeout(showNotice, 1000 * 30);
    }
  };

  const dispatch = useDispatch();

  const openRegistrationModal = () => {
    dispatch(openModal(<Registration/>, 'Регистрация'));
  }

  return (
    <div className="main-container" ref={mainBlock}>
      {/*<DepartureBoard/>*/}

      <div className="header">
        <img src={Logo} className="logo"/>
        <Topnav/>
      </div>

      <div className="block-container" style={{zIndex: 100}}>
        <TopBanner/>
      </div>

      <Anons/>

      <div className="block-container">
        <Speakers data={speakers}/>
      </div>

      <Registration loading={loading} hash={hash} partFormat={partFormat}/>

      <div className="block-container">
        <Faq data={faqs}/>
      </div>

      <Contacts/>


      {/*<ArrowToTop/>*/}
    </div>
  );
}

export default MainPage;