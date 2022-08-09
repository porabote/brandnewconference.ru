import React, {useEffect, useState} from 'react';
import Letter from "./letter";

const DepartureBoard = () => {

  let windowWidth = window.screen.width;

  let words = [
    "НОВАЯ",
    "КОНФЕРЕНЦИЯ",
    "DENTSU",

    "НОВАЯ",
    "ИСТОРИЯ",
    "DENTSU",

    "НОВЫЙ",
    "ВЗГЛЯД",
    "НА СЕБЯ",

    "НОВЫЙ",
    "ВЗГЛЯД",
    "НА МАРКЕТИНГ",

    "НОВЫЙ",
    "ВЗГЛЯД",
    "НА БИЗНЕС",

    "НОВЫЙ",
    "ВЗГЛЯД",
    "НА РЕКЛАМУ",

    "НОВЫЙ",
    "ВЗГЛЯД",
    "НА ЖИЗНЬ",
  ];

  const stylesDesktop = {
    fontSize: '125px',
    halfHeight: '75px',
    lineHeight: '120px',
    prevTop: '75px',
    prevSpanTop: '-75px',
    backTop: '75px',
    backSpanTop: '-75px',
    frontTop: '0px',
    frontSpanTop: '0px',
    nextTop: '0px',
    nextSpanTop: '0px',
    letterWidth: 90,
    rowTopOffset: 125,
    szhOffset: 135,
    szhWidth: 35,
    spaceOffset: 45,
  };

  const stylesNote = {
    fontSize: '5rem',
    halfHeight: '50px',
    lineHeight: '80px',
    prevTop: '50px',
    prevSpanTop: '-50px',
    backTop: '50px',
    backSpanTop: '-50px',
    frontTop: '0px',
    frontSpanTop: '0px',
    nextTop: '0px',
    nextSpanTop: '0px',
    letterWidth: 67,
    rowTopOffset: 87,
    szhOffset: 80,
    szhWidth: 34,
    spaceOffset: 33,
  };

  const stylesMobile = {
    fontSize: '2.4rem',
    halfHeight: '30px',
    lineHeight: '60px',
    prevTop: '30px',
    prevSpanTop: '-30px',
    backTop: '30px',
    backSpanTop: '-30px',
    frontTop: '0px',
    frontSpanTop: '0px',
    nextTop: '0px',
    nextSpanTop: '0px',
    letterWidth: 32,
    rowTopOffset: 43,
    szhOffset: 40,
    szhWidth: 12,
    spaceOffset: 15,
  };

  let style = stylesMobile;
  if (windowWidth > 1280) {
    style = stylesDesktop;
  } else if (windowWidth > 768) {
    style = stylesNote;
  }

  useEffect(() => {
    reloadRows(scopeCurrentIndex);
    return () => {
      //clearTimeout(timer);
    };
  }, [scopeCurrentIndex]);

  const [bannerWidth, setBannerWidth] = useState(1260);
  const [cellsCount, setCellsCount] = useState(12);
  const [scopeCurrentIndex, setScopeCurrentIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [countOfRandomLetters, setCountOfRandomLetters] = useState(12);

  const setAlphabet = () => {
    let alphabet = [];
    for (let i = 1040; i < 1072; i++) {
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  }
  let alphabet = setAlphabet();

  const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  let rowCount = 3;

  const reloadRows = (sliceStart) => {

    setRows(words.slice(sliceStart,sliceStart + 3));

    if (sliceStart <= 15) {
      setTimeout(() => {
        reloadRows(sliceStart + 3);
      }, 3000);
    }
  }

  return (
    <div className="departure-board">

      {rows.map((row, index) => {
        let letters = row.padEnd(12).split('');

        let offset = 0;

        return (
            <div className="departure-board-row" key={index} style={{top: `${index * style.rowTopOffset}px`}}>
              {letters.map((letter, index) => {

                let letterWidth = ( letter != 'Ж') ? style.letterWidth : style.szhOffset;

                let countOfRandomLetters = getRandomArbitrary(4, 8);

                let randomLetters = getMultipleRandom(alphabet, countOfRandomLetters);

               let randomKey = getRandomArbitrary(4, countOfRandomLetters);
             //  if (randomKey < 4) randomKey = 4;

               randomLetters.splice(randomKey, 0, letter);
              // countOfRandomLetters++;

                let element =  <Letter
                  style={style}
                  letterWidth={letterWidth}
                  letterLeft={offset}
                  randomLetters={randomLetters}
                  key={index}
                  letter={letter} />;

                if (letter == 'Ж' ) {
                  offset += style.letterWidth + style.szhWidth;
                 // console.log(randomLetters);
                } else if (letter == 0) {
                  offset += style.letterWidth - style.spaceOffset;
                } else {
                  offset += style.letterWidth;
                }
                return element;
              })}
            </div>
        );
      })}

    </div>
  );
};

export default DepartureBoard;