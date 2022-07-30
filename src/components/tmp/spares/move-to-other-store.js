import React from "react";
import { connect } from "react-redux";
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
import { withDictsData } from "@hocs";

const MoveToOtherStore = (props) => {

  const values = props.data || {};
  values.quantity_moved = "0";
  values.store_id = "";

  const { objects } = props.dicts;

  return(
    <div>
      <Form
        values={values}
        action={`/api/spares/method/moveToOtherStore/${props.data.id}`}
        submitFormBefore={(values) => {
          if (
            parseInt(values.quantity) < parseInt(props.data.quantity_moved)
            || parseInt(props.data.quantity_moved) < 1
          ) {
            alert('Параметр "Количество" должен быть больше нуля и не превышать остаток на складе.');
            return false;
          }

          if (!values.store_id.length) {
            alert('Пожалуйста, выберите склад.');
            return false;
          }

          return true;
        }}
        submitFormAfter={(resp) => {
          window.location = `/porabote/spares/view/${resp.data.id}`
        }}
      >

        <Field>
          <Input
            label="Название"
            name="name"
            disabled={() => true}
          />
        </Field>

        <Field>
          <Input
            label={`Переместить в количестве ( ${props.data.quantity} в остатке )`}
            name="quantity_moved"
            mask={(value) => {
              return Masks.digitalOnly(value);
            }}
          />
        </Field>


        <Field>
          <Select
            name="store_id"
            label="Склад"
          >
            {Object.keys(objects).map((id) => {
              if (objects[id].kind == "store" && objects[id].id != props.data.store_id) {
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
            onClick={() => {
              //this.props.removeModalItem(this.props.itemkey)
              //this.props.fetchData()
            }}
            style={{width: '140px', marginTop: '20px'}}
          />
        </SubmitButton>
      </Form>
    </div>
  );
}

export default withDictsData(MoveToOtherStore, { storeAlias: "spares" });