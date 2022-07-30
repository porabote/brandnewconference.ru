import React, {useState, useEffect} from 'react';

const TopMenu = () => {

  useEffect(() => {

    const handleScroll = event => {

      // let pixelsInPercent = mainBlock.current.offsetHeight / 100;
      // let topLineWidth = parseInt(window.scrollY /pixelsInPercent);
      // setTopLineWidth(`${topLineWidth}%`);

      setMenuPositionClass((window.scrollY < 600) ? 'picked' : 'fixed');
      let menuPositionClass = (window.scrollY)

    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const [menuPositionClass, setMenuPositionClass] = useState('picked');

  return (
    <section className={`menu-top ${menuPositionClass}`}>
      <ul className="menu-top__navs">
        {/*<li className="menu-top__navs__nav"><a href="#timeline">Расписание /</a></li>*/}
        <li className="menu-top__navs__nav"><a href="#preview">Анонс</a></li>
        {/*<li className="menu-top__navs__nav"><a href="#translation">Трансляция</a></li>*/}
        <li className="menu-top__navs__nav"><a href="#speakers">Спикеры</a></li>
        <li className="menu-top__navs__nav"><a href="#faq">FAQ</a></li>
        <li className="menu-top__navs__nav"><a href="#contacts">Контакты</a></li>
        {/*<li className="menu-top__navs__nav"><a href="#archive">Архив</a></li>*/}
        <li className="menu-top__navs__nav">
          <a className="menu-top__navs__nav_link registration" href="#registration">
            Регистрация
          </a></li>
      </ul>
    </section>
  );
};

export default TopMenu;