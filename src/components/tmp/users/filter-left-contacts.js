import React from "react";
import { useSelector } from "react-redux";
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

const FilterLeft = (props) => {

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
          name="account_id"
          label="Площадка"
          afterSelectCallback={(event, formContext) => {
            props.setLeftFilter(formContext.values);
          }}
        >
          {Object.keys(accounts).map((id) => {
            return <Option key={id} value={id}>{accounts[id].ru_name}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="department_id"
          label="Департамент"
          afterSelectCallback={(event, formContext) => {
            props.setLeftFilter(formContext.values);
          }}
        >
          {Object.keys(departments)
            .filter(dep => departments[dep].label == 'other')
            .map((id) => {
            return <Option key={id} value={id}>{`${departments[id].name} - ${accounts[departments[id].account_id].ru_name}`}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="shift_id"
          label="Смена"
          afterSelectCallback={(event, formContext) => {
            props.setLeftFilter(formContext.values);
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