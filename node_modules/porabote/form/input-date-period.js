import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import "./input-date-period.less";
import Datas from "porabote/datas";
import DateTime from "porabote/date-time";
import moment from "moment";

class InputDatePeriod extends React.Component {

  render() {

    let startDate = Datas.getValueByPath(this.props.names[0], this.props.formContext.values);
    startDate = (startDate.length > 0) ? new Date(startDate) : null;
    let endDate = Datas.getValueByPath(this.props.names[1], this.props.formContext.values);
    endDate = (endDate.length > 0) ? new Date(endDate) : null;

    const onChange = (dates) => {
      this.props.formContext.setFieldValue(this.props.names[0], moment(dates[0]).format('YYYY-MM-DD HH:mm:ss'));
      this.props.formContext.setFieldValue(this.props.names[1], moment(dates[1]).format('YYYY-MM-DD HH:mm:ss'));
    };

    let values = [startDate, endDate];

    return (
      <div>

        <div className="form_item">
          <label className="form_item__label">{this.props.label}</label>

          <DateRangePicker
            value={values}
            onChange={onChange}
            format="d-MMM-yy"
            rangeDivider=" по "
          />
        </div>

      </div>
    )
  }

}

export default InputDatePeriod