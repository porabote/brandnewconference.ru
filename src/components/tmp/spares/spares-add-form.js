import React, {Component} from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate,
  Masks,
} from 'porabote/form';
import {withDictsData} from "@hocs";

const SparesAddForm = (props) => {

  const {dicts} = useSelector(state => state.dicts);
  const {objects, spares_types} = dicts;

  return (
    <div>
      <Form
        values={props.data || {}}
        action="/api/spares/add/"
        submitFormAfter={(resp) => {
          window.location = `/porabote/spares/view/${resp.data.id}`
        }}
      >
        <Field>
          <Input
            label="Название"
            name="name"
          />
        </Field>
        <Field>
          <Input
            label="Тип/марка"
            name="description"
          />
        </Field>

        <Field>
          <Input
            label="Количество"
            name="quantity"
            disabled={(values) => {
              if (values.status_id == 66 || typeof values.status_id == "undefined") return false;
              return true;
            }}
            mask={(value) => {
              return Masks.digitalOnly(value);
            }}
          />
        </Field>

        <Field>
          <Input
            label="Единица измерения"
            name="unit"
          />
        </Field>

        <Field>
          <Input
            label="Артикул"
            name="vendor_code"
          />
        </Field>

        <Field>
          <InputDate name="repair_date" label="Дата"/>
        </Field>

        {/*<Field>*/}
        {/*    <Select*/}
        {/*      name="spares_type_id"*/}
        {/*      label="Тип"*/}
        {/*      disabled={() => {*/}
        {/*          if (typeof props.data != "undefined" && props.data.id) {*/}
        {/*              return true;*/}
        {/*          }*/}
        {/*          return false;*/}
        {/*      }}*/}
        {/*    >*/}
        {/*        {Object.keys(spares_types).map((id) => {*/}
        {/*            return <Option key={id} value={id}>{spares_types[id].name}</Option>*/}
        {/*        })}*/}
        {/*    </Select>*/}
        {/*</Field>*/}

        <Field>
          <Select
            name="store_id"
            label="Склад"
            disabled={() => {
              if (typeof props.data != "undefined" && props.data.id) {
                return true;
              }
              return false;
            }}
          >
            {Object.keys(objects).map((id) => {
              if (objects[id].kind == "store") {
                return <Option key={id} value={id}>{objects[id].name}</Option>
              }
            })}
          </Select>
        </Field>


        <SubmitButton>
          <Button
            text="Сохранить"
            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
            type="button"
            style={{width: '140px', marginTop: '20px'}}
          />
        </SubmitButton>
      </Form>
    </div>

  )

}

export default SparesAddForm;