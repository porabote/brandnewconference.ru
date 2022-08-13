import React from "react";
import { useSelector } from "react-redux";
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

const FilterLeft = () => {

  const { departments, accounts, shifts } = useSelector(state => state.dicts.dicts);

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="where.status"
          label="Статус"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys({}).map((alias) => {
            return <Option key={alias} value={alias}>{statuses[alias]}</Option>
          })}
        </Select>
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;