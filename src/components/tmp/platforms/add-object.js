import React, { Component } from 'react'
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate
} from 'porabote/form';
import Api from '@services/api-service';
import { withDictsData } from "@hocs";

class AddObject extends Component {

  state = {
    values: this.props.data || {
      platform_id: this.props.platformId || null,
      name: "",
      address: "",
      kind: this.props.kind || "self",
      parent_id: this.props.parent_id || "",
    }
  }

  submitForm = (values) => {

    Api.get(
      `/api/objects/method/add/`,
      {
        query: values,
      }
    ).then((data) => {
      //this.props.fetchRecord();
    })
  }

  render() {

    const { objects, platforms } = this.props.dicts;

    return (
      <div>
        <Form
          values={this.state.values}
          action="/api/objects/method/add/"
          submitForm={this.submitForm}
          submitFormAfter={(resp) => {
            this.props.getRecord()
          }}
        >

          <Field>
            <Select
              name="platform_id"
              label="Площадка"
            >
              {Object.entries(platforms).map((item, index) => {
                let itemData = item[1];
                return <Option key={itemData.id} value={itemData.id}>{itemData.ru_alias}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Input
              label="Название"
              name="name"
            />
          </Field>
          <Field>
            <Input
              label="Адрес"
              name="address"
            />
          </Field>
          <Field>
            <Select
              name="kind"
              label="Тип"
              empty={false}
            >
              <Option key="self" value="self">Базовый</Option>
              <Option key="store" value="store">Склад</Option>
              <Option key="rent" value="rent">Аренда</Option>
              <Option key="hole" value="hole">Скважина</Option>
            </Select>
          </Field>

          <Field>
            <Select
              name="parent_id"
              label="Родительский объект (не обязательно)"
            >
              {Object.entries(objects).map((item, index) => {
                let itemData = item[1];
                if (!itemData.parent_id) {
                  return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
                }
              })}
            </Select>
          </Field>

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {
                this.props.removeModalItem(this.props.itemkey);
                this.props.getRecord();
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default withDictsData(AddObject, { storeAlias: 'platforms' });