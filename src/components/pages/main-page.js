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

const MainPage = () => {

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    let userId = params.has('userid') ? params.get('userid') : null;

    Api.get(`/api/landing/get/?userId=${userId}`)
      .then((resp) => {
        if (resp.data.hash) {
          setPartFormat(resp.data.hash.part_format);
          setHash(resp.data.hash.hash);
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

  const dispatch = useDispatch();

  const openRegistrationModal = () => {
    dispatch(openModal(<Registration/>, 'Регистрация'));
  }

  return (
    <div ref={mainBlock}>
      {/*<DepartureBoard/>*/}
      <Topnav/>
      <TopBanner/>
      <Anons/>
      <Speakers data={speakers}/>
      <Registration loading={loading} hash={hash} partFormat={partFormat}/>
      <Faq data={faqs}/>
      <Contacts/>



      {/*<ArrowToTop/>*/}
    </div>
  );
}

export default MainPage;