import React, {useState} from "react";
import Calendar from "@components/calendar";

const ShiftsCalendar = (props) => {

  let [periods, setPeriods] = useState(
    (props.attrs.periods && props.attrs.periods.length > 0) ? JSON.parse(props.attrs.periods) : []
  );

  return(
    <div className="prb-calendar-wrap">
      <Calendar
        periods={periods}
        onSelect={(periods, periodsDatetime) => {
          props.savePeriods(props.id, periodsDatetime, setPeriods);
        }}
      />
    </div>
  );
}

export default ShiftsCalendar;