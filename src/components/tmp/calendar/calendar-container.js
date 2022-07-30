import React, {useState, useEffect} from "react";
import moment from "moment";
import DateTime from "porabote/date-time";
import Datas from "porabote/datas";
import CalendarYear from "./calendar-year.js";
import CalendarContext from "./calendar-context";
import "./style.less";

const CalendarContainer = (props) => {

  const [yearStart, setYearStart] = useState(moment().year());
  const [years, setYears] = useState([yearStart]);
  const [days, setDays] = useState({});
  const [pickedDateStart, setPickedDateStart] = useState(null);
  const [pickedDateFinish, setPickedDateFinish] = useState(null);
  const [markedDateToDelete, setMarkedDateToDelete] = useState(null);

  const convertPeriodsToDates = (periodsRaw) => {

    let periods = [];
    return periodsRaw.map(period => {
      return {
        dateStart: DateTime.stringToDate(period.dateStart),
        dateFinish: DateTime.stringToDate(period.dateFinish),
        markedToDelete: false,
      };
    });
  }

  let [periods, setPeriods] = useState([]);

  useEffect(() => {
    let periods = convertPeriodsToDates(props.periods || []);
    setPeriods(periods);
    setDaysByYear(yearStart, periods);
  }, [props.periods]);

  const setDaysByYear = (year, periods) => {

    let days = {};
    days[year] = {};

    for (let month = 0; month <= 11; month++) {

      days[year][month] = {};

      var date = new Date(year, month, 1, 0, 0, 0);
      while (date.getMonth() === month) {

        let day = date.getDate();
        let date_str = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        let isSelected = false;
        let inPeriod = checkIsInPeriod(date, periods);
        if (inPeriod) {
          isSelected = true;
        }
        
        days[year][month][date.getDate()] = {
          year,
          month,
          day,
          time: new Date(date).getTime(),
          date: new Date(date),
          date_str,
          day_number: date.getDate(),
          isSelected: isSelected,
          isMarked: false,
          isMarkedToDelete: false,
        };
        date.setDate(date.getDate() + 1);
      }
    }
    setDays(days);
  }

  const checkIsInPeriod = (date, periods) => {

    let inPeriod = periods.filter((period) => date >= period.dateStart && date <= period.dateFinish);
    if (inPeriod.length > 0) {
      return inPeriod;
    }

    return false;
  }

  let onSelect = props.onSelect || (() => {

  });

  const onClick = (dayData) => {

    let {day, month, year} = dayData;

    let selectedDay = days[year][month][day];

    if (!selectedDay.isSelected) {
      selectedDay.isMarked = true;

      if (!pickedDateStart) {
        setPickedDateStart(selectedDay.date);
      } else {
        setPickedDateFinish(selectedDay.date);
        addPeriod(selectedDay.date);
      }

    } else {
      if (!markedDateToDelete) {
        selectedDay.isMarkedToDelete = true;
        setMarkedDateToDelete(selectedDay.date);
      } else {
        deletePeriod();
        setMarkedDateToDelete(null);
      }
    }

    setDays({...days});
  }

  let convertDatesPeriodsToStringFormat = (periods) => {
    return periods.map((period, index) => {

      let timeStart = period.dateStart;
      let dateStart =
        `${timeStart.getFullYear()}-` +
        `${(timeStart.getUTCMonth() + 1).toString().padStart(2, "0")}-` +
        `${(timeStart.getUTCDate() + 1).toString().padStart(2, "0")}`;

      let timeFinish = period.dateFinish;
      let dateFinish =
        `${timeFinish.getFullYear()}-` +
        `${(timeFinish.getUTCMonth() + 1).toString().padStart(2, "0")}-` +
        `${(timeFinish.getUTCDate() + 1).toString().padStart(2, "0")}`;

      return {dateStart, dateFinish, markedToDelete: false}

    });
  }

  let addPeriod = (dateFinish) => {

    let pickedPeriod = (pickedDateStart < dateFinish) ?
      {dateStart: pickedDateStart, dateFinish} : {dateStart: dateFinish, dateFinish: pickedDateStart};

    periods.push(pickedPeriod);
    setPeriods([...periods]);

    // todo merge periods
    for (let i = 0; i < length; i++) {

    }

    setPickedDateStart(null);
    setPickedDateFinish(null);

    let periodsAsStrings = convertDatesPeriodsToStringFormat(periods);

    onSelect(periods, periodsAsStrings);
  }


  const deletePeriod = () => {

    let changedPeriods = periods.filter((period) => {
      return period.dateStart.getTime() != markedDateToDelete.getTime() && period.dateFinish.getTime() != markedDateToDelete.getTime();
    });

    let periodsAsStrings = convertDatesPeriodsToStringFormat(changedPeriods);
    onSelect(changedPeriods, periodsAsStrings);
  }

  return <CalendarContext.Provider value={{
    onClick,
  }}>
    <div className="prb-calendar">
      {years.map((year, index) => {
        return <CalendarYear days={days} key={index} number={year}/>
      })}
    </div>
  </CalendarContext.Provider>
}

export default CalendarContainer;