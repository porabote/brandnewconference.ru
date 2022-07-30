import React, {Component} from "react";
import {useSelector} from "react-redux";
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

const UsersAddForm = () => {

  const { departments } = useSelector(state => state.dicts.dicts);

  return (
    <div>

      <Form
        values={{
          last_name: null,
          name: null,
          patronymic: null,
          username: null,
          post_name: null,
        }}
        action="/api/users/method/makeInvite/"
        submitFormAfter={(resp) => {
          props.removeModalItem(props.itemkey);
          props.fetchData();
        }}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <Input
              label="Фамилия1"
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
            name="username"
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
                return <Option key={id} value={id}>{departments[id].name}</Option>
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