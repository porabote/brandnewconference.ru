import React from "react";
import { useSelector } from "react-redux";
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

const FilterLeft = () => {

  const { departments, accounts, shifts } = useSelector(state => state.dicts.dicts);
  const statuses = {
    new: 'Новый',
    invited: 'Приглашен в систему',
    external: 'Внешний сотрудник (Аутсорсинг)',
    active: 'Активен',
    fired: 'Уволен',
  }

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="where.account_id"
          label="Площадка"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(accounts).map((id) => {
            return <Option key={id} value={id}>{accounts[id].ru_name}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.department_id"
          label="Департамент"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(departments).map((id) => {
              return <Option key={id} value={id}>{departments[id].name}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.status"
          label="Статус"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(statuses).map((alias) => {
            return <Option key={alias} value={alias}>{statuses[alias]}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.shift_id"
          label="Смена"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(shifts).map((id) => {
            return <Option key={shifts[id].id} value={shifts[id].id}>{shifts[id].title}</Option>
          })}
        </Select>
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;