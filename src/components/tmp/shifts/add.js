import React, {useEffect} from "react";
import {useSelector} from 'react-redux';

import {
  Form,
  Field,
  Input,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";

const Add = (props) => {

  const { api_users, platforms } = props.dicts;

  return (
    <Form
      values={{
        title: '',
        head_user_id: '',
        platform_id: '',
      }}
      submitForm={(values) => {
        props.addConfirm(values, props.itemkey);
      }}
    >

      <div>
        <Field>
          <Input name="title" label="Название"/>
        </Field>
      </div>

      <Field>
        <Select name="head_user_id" label="Руководитель">
          {Object.entries(api_users).map((item, index) => {
            const user = item[1];
            return <Option key={index} value={user.id}>{`${user.name} (${user.post_name})`}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select name="platform_id" label="Площадка">
          {Object.entries(platforms).map((item, index) => {
            const platform = item[1];
            return <Option key={index} value={platform.id}>{platform.ru_alias}</Option>
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
  );
}

export default Add;