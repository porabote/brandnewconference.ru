import React, {useState, useEffect} from 'react';
import NavMenuIcon from "@assets/svg/nav-menu.svg"

const Topnav = () => {

  // useEffect(() => {
  //   const handleScroll = event => {
  //     setMenuPositionClass((window.scrollY < window.innerHeight) ? 'transparent' : 'bg');
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

 // const [menuPositionClass, setMenuPositionClass] = useState('transparent');
//  const [menuMode, setMenuMode] = useState('hidden');
  const [isOpen, setIsOpen] = useState('hidden');

  const switchMenu = () => {
    setIsOpen((isOpen == 'hidden') ? 'showed' : 'hidden');
  }

  return (
    <React.Fragment>
      <div className={`topnav ${isOpen}`}>
        <div className="topnav__nav"><a className="topnav__nav__link" href="#preview">О конференции</a></div>
        <div className="topnav__nav"><a className="topnav__nav__link" href="#speakers">Спикеры</a></div>
        <div className="topnav__nav"><a className="topnav__nav__link" href="#timings">Расписание</a></div>
        <div className="topnav__nav"><a className="topnav__nav__link" href="#faq">FAQ</a></div>
        <div className="topnav__nav"><a className="topnav__nav__link" href="#contacts">Контакты</a></div>
        <div className="topnav__nav registration">
          <a className="topnav__nav__link registration" href="#youtubeBroadcast">Смотреть</a>
        </div>
      </div>
      <div
        className="topnav__nav__thumbler"
        onClick={switchMenu}
      >
        <img src={NavMenuIcon}/>
      </div>
    </React.Fragment>
  )
    ;
};

export default Topnav;