import React, {useState, useEffect} from 'react';
import NavMenuIcon from "@assets/svg/nav-menu.svg"

const TopMenu = () => {

  useEffect(() => {
    const handleScroll = event => {
      setMenuPositionClass((window.scrollY < window.innerHeight) ? 'transparent' : 'bg');
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [menuPositionClass, setMenuPositionClass] = useState('transparent');
  const [menuMode, setMenuMode] = useState('hidden');

  const switchMenu = () => {
    setMenuMode((menuMode == 'hidden') ? 'showed' : 'hidden');
  }

  return (
    <div className={`menu-top ${menuPositionClass}`}>
      <div className="nav-button" onClick={switchMenu}>
        <img className="nav-button__img" src={NavMenuIcon} />
      </div>
      <ul className={`menu-top__navs ${menuMode}`}>
        <li className="menu-top__navs__nav"><a href="#preview">О конференции</a></li>
        <li className="menu-top__navs__nav"><a href="#speakers">Спикеры</a></li>
        <li className="menu-top__navs__nav"><a href="#faq">FAQ</a></li>
        <li className="menu-top__navs__nav"><a href="#contacts">Контакты</a></li>
        <li className="menu-top__navs__nav">
          <a className="menu-top__navs__nav_link registration" href="#registration">Регистрация</a>
        </li>
      </ul>
    </div>
  );
};

export default TopMenu;