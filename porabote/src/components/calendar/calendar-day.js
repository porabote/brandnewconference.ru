import React, {useContext, useEffect, useState} from "react";
import CalendarContext from "./calendar-context";

const CalendarDay = (props) => {

  const context = useContext(CalendarContext);

  let className = props.day.isSelected ? "prb-calendar-year-months-month-day selected" : "prb-calendar-year-months-month-day";
  if (props.day.isMarked) className = "prb-calendar-year-months-month-day marked";
  if (props.day.isMarkedToDelete) className = "prb-calendar-year-months-month-day marked_delete";

  const onClick = () => {
    context.onClick(props.day);
  }

  return <div
    className={className}
    onClick={onClick}
  >
    {props.day.day_number}
  </div>

}

export default CalendarDay;