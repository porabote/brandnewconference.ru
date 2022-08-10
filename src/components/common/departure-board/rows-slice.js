import React, {useEffect, useState} from 'react';
import {alphabet, getMultipleRandom, getRandomArbitrary} from "./actions";
import Letter from "./letter";
import style from "./styles";

const RowsSlice = (props) => {

  useEffect(() => {

    if (props.rowIndex < 5) initCounter();

    return () => {
      setCount(0);
    }

  }, [props.rows]);

  let [count, setCount] = useState(0);
  const [maxCount] = useState(15);

  const initCounter = () => {
    if (props.rowIndex < 5) showNextLetter(count);
  }


  const showNextLetter = () => {//console.log(index);
    if (count < maxCount) {
      setCount(currCount => currCount + 1);
      setTimeout(() => {
        showNextLetter(count + 1);
      }, 280);
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
              // let letterWidth = ( letter != 'Ж') ? style.letterWidth : style.szhWidth;
              // if ( letter == 'Ы') {
              //   //console.log(style.yiWidth);
              //   letterWidth = style.yiWidth;
              // }

              let randomLetters = getMultipleRandom(alphabet, getRandomArbitrary(8, 15));
              randomLetters.push(letter);
//console.log(props.rowIndex);
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
              // if (letter == 'Ж' ) {
              //   offset += style.szhWidth;
              //   // console.log(randomLetters);
              // } else if (letter == 'Ы') {console.log(style.yiWidth);
              //   offset += style.yiWidth;
              // } else if (letter == 0) {
              //   offset += style.letterWidth - style.spaceOffset;
              // } else {
              //   offset += style.letterWidth;
              // }
              return element;
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default RowsSlice;


{/*{rows.map((row, index) => {*/
}
{/*  let letters = row.padEnd(12).split('');*/
}

{/*  let offset = 0;*/
}

{/*  return (*/
}
{/*      <div className="departure-board-row" key={index} style={{top: `${index * style.rowTopOffset}px`}}>*/
}
{/*        {letters.map((letter, index) => {*/
}

{/*          let letterWidth = ( letter != 'Ж') ? style.letterWidth : style.szhWidth;*/
}
{/*          if ( letter != 'Ы') letterWidth = style.yiWidth;*/
}

{/*          let countOfRandomLetters = getRandomArbitrary(13, 13);*/
}

{/*          let randomLetters = getMultipleRandom(alphabet, countOfRandomLetters);*/
}

{/*         let randomKey = getRandomArbitrary(1, countOfRandomLetters);*/
}
{/*       //  if (randomKey < 4) randomKey = 4;*/
}

{/*         randomLetters.splice(randomKey, 0, letter);*/
}
{/*        // countOfRandomLetters++;*/
}

{/*          let element =  <Letter*/
}
{/*            style={style}*/
}
{/*            letterWidth={letterWidth}*/
}
{/*            letterLeft={offset}*/
}
{/*            randomLetters={randomLetters}*/
}
{/*            key={index}*/
}
{/*            letter={letter} />;*/
}

{/*          if (letter == 'Ж' ) {*/
}
{/*            offset += style.szhWidth;*/
}
{/*           // console.log(randomLetters);*/
}
{/*          } else if (letter == 'Ы') {*/
}
{/*            offset += style.yiWidth;*/
}
{/*          } else if (letter == 0) {*/
}
{/*            offset += style.letterWidth - style.spaceOffset;*/
}
{/*          } else {*/
}
{/*            offset += style.letterWidth;*/
}
{/*          }*/
}
{/*          return element;*/
}
{/*        })}*/
}
{/*      </div>*/
}
{/*  );*/
}
{/*})}*/
}