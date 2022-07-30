import React, {Component} from "react";
import { useSelector, useDispatch } from "react-redux";
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import {
  Form,
  Button,
  Field,
  Input,
  InputDate,
  InputHidden,
  Option,
  Select,
  SubmitButton
} from "porabote/form";

const UsersAddForm = (props) => {

  const dispatch = useDispatch();

  const { departments, accounts } = useSelector(state => state.dicts.dicts);

  const values = {
    last_name: '',
    name: '',
    patronymic: '',
    email: '',
    post_name: '',
    department_id: ''
  };

  return (
    <div>

      <Form
        values={values}
        action="/api/users/method/create/"
        submitFormAfter={(resp) => {
          if( typeof resp.error != "undefined") {
            return dispatch(openConfirm(resp.error));
          }
          props.removeModalItem(props.itemkey);
          props.fetchData();
        }}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <Input
              label="Фамилия"
              name="last_name"
            />
          </Field>
          <Field>
            <Input
              label="Имя"
              name="name"
            />
          </Field>
          <Field>
            <Input
              label="Отчество"
              name="patronymic"
            />
          </Field>
        </div>

        <Field>
          <Input
            label="Email"
            name="email"
          />
        </Field>

        <Field>
          <Input
            label="Название должности"
            name="post_name"
          />
        </Field>


        <Field>
          <Select
            name="department_id"
            label="Департамент"
          >
            {Object.keys(departments).map((id) => {
              let account = accounts[departments[id].account_id]
                if (departments[id].label != 'platform' && departments[id].label != 'object')
                return <Option key={id} value={id}>{`${departments[id].name} - (${account.ru_name})`}</Option>
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

  );

}

export default UsersAddForm;