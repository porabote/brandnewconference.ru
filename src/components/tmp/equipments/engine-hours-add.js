import React, { Component } from "react";
import {
  Form,
  Field,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate,
  InputDatePeriod,
  Masks,
} from 'porabote/form';
import Api from "@services/api-service";

class EngineHoursAdd extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      statuses: {},
      loading: true,
      values: {
        equipment_id: props.record.id,
        date_at: '',
        date_to: '',
        count: '',
      }
    }
  }

  submitForm = (values) => {

    Api.get(
      `/api/equipments/method/addEngineHours/`,
      {
        query: values,
      }
    ).then((data) => {
      this.props.getRecord();
    })
  }

  render() {

    return (
      <div>
        <Form
          values={this.state.values}
          action="/"
          submitForm={this.submitForm}
          submitFormAfter={(resp) => {
            //window.location = `/porabote/business-events/view/${resp.data.id}`
            //this.props.fetchRecord()
          }}
        >

          {/*<Field>*/}
          {/*  <Select name="organizations_own_id" label="Организация" empty={false}>*/}
          {/*    {Object.entries(organizations_own).map((item, index) => {*/}
          {/*      let itemData = item[1];*/}
          {/*      return <Option key={index} value={itemData.id}>{itemData.name}</Option>;*/}
          {/*    })}*/}
          {/*  </Select>*/}
          {/*</Field>*/}

          <Field>
            <Input
              name="count"
              label="Количество часов"
              mask={(value) => {
                return Masks.digitalOnly(value);
              }}
            />
          </Field>

          <Field>
            <InputDate name="date_at" names={["date_at", "date_to"]} label="Начало периода"/>
          </Field>
          <Field>
            <InputDate name="date_to" label="Конец периода"/>
          </Field>

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {

                this.props.getRecord();
                this.props.removeModalItem(this.props.itemkey)
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default EngineHoursAdd;