import React, { Component, useState } from "react";
import { useSelector } from "react-redux";
import {withDictsData} from "@hocs";
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
  Textarea,
  Masks,
} from 'porabote/form';
import Api from "@services/api-service";

const RepairsAdd = (props) => {

  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState(props.data || {
    type: '',
    downtime: "",
    name: "",
    equipment_id: props.record.id,
    date_at: '',
    date_to: '',
    count: '',
  });

  const { dicts } = useSelector(state => state.dicts);

  const submitForm = (values) => {

    Api.post(
      `/api/equipments-repairs/method/add/`,
      {
        body: values,
      }
    ).then((data) => {
      props.getRecord();
    })
  }

    return (
      <div>
        <Form
          values={values}
          submitForm={submitForm}
          submitFormAfter={(resp) => {
            props.removeModalItem(props.itemkey);
            props.getRecord();
          }}
        >

          <Field>
            <Select name="type" label="Вид ТО\ремонта" empty={false}>
              <Option key={1} value="repair">Ремонт</Option>
              <Option key={2} value="to">ТО</Option>
            </Select>
          </Field>

          <Field>
            <Input name="name" label="Наименование"/>
          </Field>

          <Field>
            <Input
              name="engine_hours"
              label="Наработка"
              mask={(value) => {
                return Masks.digitalOnly(value);
              }}
            />
          </Field>

          <Field>
            <InputDate name="date_at" label="Дата начала ТО/Ремонта"/>
          </Field>


          <Field>
            <Input
              name="downtime"
              label="Время простоя (ч)"
              mask={(value) => {
                return Masks.digitalOnly(value);
              }}
            />
          </Field>
          <Field>
            <Textarea name="desc_short" label="Краткое описание" grid="flex"/>
          </Field>

          {/*<Field>*/}
          {/*  <Textarea name="desc" label="Детальное описание работ" grid="flex"/>*/}
          {/*</Field>*/}

          <Field>
            <Select name="doer_id" label="Исполнитель" empty={false}>
              {Object.entries(dicts.users).map((item, index) => {
                let itemData = item[1];
                return <Option key={index} value={itemData.id}>{`${itemData.name} ( ${itemData.post_name} )`}</Option>;
              })}
            </Select>
          </Field>

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {
                props.removeModalItem(props.itemkey);
                props.getRecord();
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    );

}

export default RepairsAdd;