import React, {useState, useEffect} from 'react';

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

  return (
    <section className={`menu-top ${menuPositionClass}`}>
      <ul className="menu-top__navs">
        <li className="menu-top__navs__nav"><a href="#preview">Анонс</a></li>
        <li className="menu-top__navs__nav"><a href="#speakers">Спикеры</a></li>
        <li className="menu-top__navs__nav"><a href="#faq">FAQ</a></li>
        <li className="menu-top__navs__nav"><a href="#contacts">Контакты</a></li>
        <li className="menu-top__navs__nav">
          <a className="menu-top__navs__nav_link registration" href="#registration">Регистрация</a>
        </li>
      </ul>
    </section>
  );
};

export default TopMenu;