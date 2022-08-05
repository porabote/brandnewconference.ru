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

const MainPage = () => {

  useEffect(() => {

    Api.get(`/api/landing/get/`)
      .then((resp) => {
        setSpeakers(resp.data.speakers);
        setFaqs(resp.data.faqs);
      });
  }, []);

  const mainBlock = useRef(null);

  const [topLineWidth, setTopLineWidth] = useState(0);
  const [speakers, setSpeakers] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const dispatch = useDispatch();

  const openRegistrationModal = () => {
    dispatch(openModal(<Registration/>, 'Регистрация'));
  }

  return (
    <div ref={mainBlock}>
      {/*<ArrowToTop/>*/}
      <Topnav/>
      {/*<TopBanner/>*/}
      <Anons/>
      <Speakers data={speakers}/>
      <Registration/>
      <Faq data={faqs}/>
      <Contacts/>
    </div>
  );
}

export default MainPage;