import React, {useEffect, useContext} from "react";
import moment from "moment";
import CalendarDay from "./calendar-day";

const CalendarMonth = (props) => {

  useEffect(() => {
  }, [props]);

  let weekDaysAliases = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  let firstDayNumberOfWeek = moment(`${props.year}-${props.number+1}-01`).day();
  let delta = (6- Math.abs(firstDayNumberOfWeek - 7));
  if (delta < 0) delta = 6;

  let daysDummy = [];
  for (let i = 0; i < delta; i++ ) daysDummy.push(i);

  return(
    <div className="prb-calendar-year-months-month">
      <div className="prb-calendar-year-months-month-panel">
        {props.month_alias} {props.year}
      </div>
      <div className="prb-calendar-year-months-month-days-names">
        {weekDaysAliases.map((dayAlis, index) => {
          return <div key={index} className="prb-calendar-year-months-month-day">{dayAlis}</div>
        })}
      </div>
      <div className="prb-calendar-year-months-month-days">
        {daysDummy.map((month, index) => (<div key={index} className="prb-calendar-year-months-month-day"></div>))}
        {Object.entries(props.days).map((item, index) => {

          let day = item[1];

          return <CalendarDay
            key={index}
            day={day}
          />
        })}
      </div>
    </div>
  );
}

export default CalendarMonth;