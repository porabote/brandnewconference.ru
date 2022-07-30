import React, {Component} from 'react';
import {useSelector} from 'react-redux';
import {withDictsData} from '@hocs'
import {Field, Option, Select} from 'porabote/form'

const FilterLeft = (props) => {

  const { dicts } = useSelector(state => state.dicts);

  const {
    objects,
    organizations_own,
    platforms,
    equipments_types,
    statuses
  } = dicts;

  return (
    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="where.platform_id"
          label="Площадка"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.entries(platforms).map((item, index) => {
            let itemData = item[1];
            return <Option key={itemData.id} value={itemData.id}>{itemData.ru_alias}</Option>;
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.object_id"
          label="Обьект"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.entries(objects).map((item, index) => {
            let itemData = item[1];
            return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.type_id"
          label="Категория"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.entries(equipments_types).map((item, index) => {
            let itemData = item[1];
            return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.status_id"
          label="Статус"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.entries(statuses).map((item, index) => {
            let itemData = item[1];
            if (itemData && itemData.model_alias == "equipments") {
              return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
            }
          })}
        </Select>
      </Field>
    </React.Fragment>
  )
}

export default FilterLeft;