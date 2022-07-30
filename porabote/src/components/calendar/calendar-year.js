import React, { useState } from "react";
import moment from "moment";
import CalendarMonth from "./calendar-month";

const CalendarYear = (props) => {

  const [months, setMonths] = useState(moment.months());

  return(
    <div className="prb-calendar-year">
      <div className="prb-calendar-year-months">
        {Object.entries(props.days).map((year_item, index) => {

          let year = year_item[0];
          let days = year_item[1];

          return Object.entries(days).map((item, index) => {

            let days = item[1];

            return <CalendarMonth
              key={index}
              number={index}
              days={days}
              year={props.number}
              month_alias={months[index]}
            />
          });
        })}
      </div>
    </div>
  );
}

export default CalendarYear;