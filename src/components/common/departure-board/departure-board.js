import React, {useEffect, useState} from 'react';
import Letter from "./letter";

const DepartureBoard = () => {

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

  const stylesDesctop = {
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
  };

  let style = stylesDesctop;

  useEffect(() => {
    reloadRows(scopeCurrentIndex);

  //  setScopeCurrentIndex(currentValue => currentValue + 3);

   // console.log(scopeCurrentIndex);

   // setScopeCurrentIndex(currentValue => currentValue + 3);
    return () => {
      //clearTimeout(timer);
    };
  }, [scopeCurrentIndex]);

  const [bannerWidth, setBannerWidth] = useState(1260);
  const [cellsCount, setCellsCount] = useState(12);
  const [scopeCurrentIndex, setScopeCurrentIndex] = useState(0);
  //const [cellWidth, setCellWidth] = useState(10);
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
    <div className="departure-board" style={{width: `${bannerWidth}px`}}>

      {rows.map((row, index) => {
        let letters = row.padEnd(12).split('');

        let offset = 0;

        return (
            <div className="departure-board-row" key={index} style={{top: `${index * 125}px`}}>
              {letters.map((letter, index) => {

                let letterWidth = ( letter != 'Ж') ? 90 : 135;

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
                  offset += 90 + 35;
                 // console.log(randomLetters);
                } else if (letter == 0) {
                  offset += 90 - 45;
                } else {
                  offset += 90;
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