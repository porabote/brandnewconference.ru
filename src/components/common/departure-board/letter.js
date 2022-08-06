import React, {useState, useEffect} from 'react';

const Letter = (props) => {

  useEffect(() => {

    if(props.letter != 0) {
      initCounter();
    } else {
      showNextLetter(randomLetters, 6);
    }
  }, [props]);

  const [letter, setLetter] = useState();
  const [randomLetters, setRandomLetters] = useState([]);

  const initCounter = () => {
    let randomLetters = [...props.randomLetters];
    randomLetters.push(props.letter);
    showNextLetter(randomLetters, 0);
  }

  const showNextLetter = (scoupe, index) => {
    setLetter(scoupe[index]);
    if (index < 6) {
      setTimeout(() => showNextLetter(scoupe, index + 1), 100);
    }
  }

  return (
    <div
      className="departure-board-row__letter"
      style={{height: `105px`}}
    >{letter}</div>
  );
};

export default Letter;