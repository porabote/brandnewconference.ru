import React, {useEffect, useState, useRef} from 'react';
import RowsSlice from "./rows-slice";

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

  let prevRowIndex = useRef(0);

  useEffect(() => {

  //  console.log(`${prevRowIndex.current} -- ${rowIndex}`);
    reloadRows(rowIndex, rowIndex);
  //  init();

    prevRowIndex.current = rowIndex;

    return () => {
      //clearTimeout(timer);
    };
  }, [rowIndex]);


  let [rowIndex, setRowIndex] = useState(0);
  const [rows, setRows] = useState([]);
  const [countOfRandomLetters, setCountOfRandomLetters] = useState(12);

  let rowCount = 3;

  const reloadRows = (sliceStart) => {



    if (sliceStart <= 18) {
      setRows(words.slice(sliceStart,sliceStart + rowCount));
      setRowIndex((curIndex) => curIndex + 1);

      setTimeout(() => {
        reloadRows(sliceStart + rowCount);
      }, 3000);
    }
  }
//console.log(rowIndex)
  return (
    <div className="departure-board">
      <RowsSlice rowIndex={rowIndex} rows={rows}></RowsSlice>
    </div>
  );
};

export default DepartureBoard;