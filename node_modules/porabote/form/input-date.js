import React, {useState, useEffect} from 'react'
import DatePicker from 'react-date-picker';
import Datas from "porabote/datas";
import moment from 'moment';

const InputDate = (props) => {

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {

    let currentValue = Datas.getValueByPath(props.name, props.formContext.values);

    if (currentValue && currentValue.length) {
      currentValue = new Date(currentValue);
    } else {
      currentValue = null;
    }

    setStartDate(currentValue);

  }, []);

  const convertDate = (inputFormat) => {
    function pad(s) {
      return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')
  }

  return (
    <div>

      <div className="form_item">
        <label className="form_item__label">{props.label}</label>

        <DatePicker
          format="d.MM.yy"
          selected={startDate}
          value={startDate}
          onChange={(date) => {
            let dateFormated = (date) ? convertDate(date) : null;
            props.formContext.setFieldValue(props.name, dateFormated)
            setStartDate(date);

            if (typeof props.onChange === "function") {
              props.onChange(date, props.formContext);
            }

          }}
          isClearable
        />
      </div>

    </div>
  )
}

export default InputDate