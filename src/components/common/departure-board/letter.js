import React, {useState, useEffect} from 'react';

const Letter = (props) => {

  useEffect(() => {

    setIsStopped(false);
    setIndex(0);
    // Если это не пробел
    if(props.letter != 0) {
      initCounter();
    } else {
      showNextLetter(randomLetters, props.randomLetters.length);
      setIsStopped(true);
    }

    return () => {
      setIndex(index);
    }

    // initCounter();


  }, [props.letter]);

  const [letter, setLetter] = useState();
  const [index, setIndex] = useState();
  const [scope, setScope] = useState();
  const [randomLetters, setRandomLetters] = useState([]);
  const [isStopped, setIsStopped] = useState(false)

  const [nextLetter, setNextLetter] = useState("");
  const [prevLetter, setPrevLetter] = useState("");


  const initCounter = () => {
    let randomLetters = props.randomLetters;
    randomLetters.push(props.letter);
   // setRandomLetters(randomLetters);
    showNextLetter(randomLetters, 1);
  }

  const showNextLetter = (scoupe, index) => {

    setIndex(index);
    setNextLetter(scoupe[index + 1]);
    setPrevLetter(scoupe[index]);

    // Если слуд буква совпадает с искомой
    if (scoupe[index + 1] == props.letter) {

      setPrevLetter(scoupe[index + 1]);
      setIsStopped(true);
      return;
    }
    if (index < props.randomLetters.length) {
      setTimeout(() => showNextLetter(scoupe, index + 1), 250);
    } else {
      setIsStopped(true);
    }

  }

  let style = props.style;

  return (
    <div
      className={isStopped ? "departure-board-row__letter flap" : "departure-board-row__letter flap animated fast"}
      style={{
        left: `${props.letterLeft}px`,
        width: `${props.letterWidth}px`,
        lineHeight: style.lineHeight,
        fontSize: style.fontSize,
      }}
    >
      <div style={{top: style.nextTop, height: style.halfHeight, zIndex: 100}} className="half next">
        <span style={{top: style.nextSpanTop}}>{nextLetter}</span>
      </div>
      <div style={{top: style.prevTop, height: style.halfHeight, zIndex: 100}} className="half prev">
        <span style={{top: style.prevSpanTop}}>{prevLetter}</span>
      </div>
      <div style={{top: style.backTop, height: style.halfHeight, zIndex: 100}} className="half back">
        <span style={{top: style.backSpanTop}}>{nextLetter}</span>
      </div>
      {/*<div className="divider"></div>*/}
      <div style={{top: style.frontTop, height: style.halfHeight, zIndex: 100}} className="half front">
        <span style={{top: style.frontSpanTop}}>{prevLetter}</span>
      </div>
    </div>
  );
};

export default Letter;