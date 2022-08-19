import React, {useEffect, useState} from 'react';
import {alphabet, getMultipleRandom, getRandomArbitrary} from "./actions";
import Letter from "./letter";
import style from "./styles";

const RowsSlice = (props) => {

  useEffect(() => {
      const timer = showNextLetter(count, props.rowIndex);
    return () => {
    //  clearTimeout(timer);
      setCount(0);
    }

  }, [props.rowIndex]);

  let [count, setCount] = useState(0);

  const showNextLetter = (count, rowIndex) => {

    if (count < 80) {
      setCount(currCount => currCount + 1);
      return setTimeout((count, rowIndex) => {
        showNextLetter(count + 1, rowIndex);
      }, 280, count, rowIndex);
    }
  }

  return (
    <React.Fragment>
      {props.rows.map((row, index) => { // Разбираем строку на буквы

        let letters = row.padEnd(12).split('');
        let offset = 0;

        return (
          <div className="departure-board-row" key={index} style={{top: `${index * style.rowTopOffset}px`}}>
            {letters.map((letter, index) => {

              let letterWidth = style.letterWidth;
              if (style.sizesMap[letter] != undefined ) {
                letterWidth = style.sizesMap[letter].width;
              }

              let randomLetters = getMultipleRandom(alphabet, getRandomArbitrary(8, 15));
              randomLetters.push(letter);

              let element =  <Letter
                rowIndex={props.rowIndex}
                count={count}
                style={style}
                letterWidth={letterWidth}
                letterLeft={offset}
                randomLetters={randomLetters}
                key={index}
                letter={letter} />;

              if (style.sizesMap[letter] != undefined ) {
                offset += style.sizesMap[letter].width;
              } else {
                offset += style.letterWidth;
              }
              return element;
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default RowsSlice;