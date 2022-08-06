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

  let rowCount = 3;

  const reloadRows = (sliceStart) => {

    setRows(words.slice(sliceStart,sliceStart + 3));

    if (sliceStart <= 15) {
      setTimeout(() => {
        reloadRows(sliceStart + 3);
      }, 2000);
    }
  }

  return (
    <div style={{width: `${bannerWidth}px`}}>

      {rows.map((row, index) => {
        let letters = row.padEnd(12).split('');
        return (
          <div className="departure-board-row" key={index}>
            {letters.map((letter, index) => {
              return <Letter randomLetters={getMultipleRandom(alphabet, 6)} key={index} letter={letter} />;
            })}
          </div>
        );
      })}

    </div>
  );
};

export default DepartureBoard;