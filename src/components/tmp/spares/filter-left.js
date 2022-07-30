import React, {Component} from 'react';
import {useSelector} from "react-redux";
import {withDictsData} from '@hocs'
import {Field, Select, Option} from 'porabote/form'
import DateTime from 'porabote/date-time'

const FilterLeft = (props) => {

  const {dicts} = useSelector(state => state.dicts);

  const {objects, statuses} = dicts

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="where.store_id"
          label="Склад"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(objects).map((id) => {
            if (objects[id].kind == "store") {
              return <Option key={id} value={objects[id].id}>{objects[id].name}</Option>
            }
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="whereIn.status_id"
          label="Статус"
          clickByOption={(event, formContext) => {
            let value = event.target.getAttribute("value");

            formContext.setFieldValue("whereIn.status_id", (!value.length) ? [66, 67] : [value], "replace");
            formContext.submitForm()
          }}
        >
          {Object.keys(statuses).map((id) => {
            if (statuses[id].model_alias == "spares") {
              return <Option key={id} value={statuses[id].id}>{statuses[id].name}</Option>
            }
          })}
        </Select>
      </Field>

    </React.Fragment>

  )

}

export default FilterLeft;