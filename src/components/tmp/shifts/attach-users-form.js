import React from 'react'
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
import Api from '@services/api-service'

const AttachUsersForm = (props) => {

  const { api_users } = props.dicts;

    let values = {
      user_ids: [],
      shift_id: props.id,
    };

    return (
      <div>
        <Form
          values={values}
          submitForm={() => props.attachUserConfirm(values, props.itemkey, props.fetchData)}
        >
          <Field>
            <Select
              name="user_ids"
              label="Пользователи"
              mode="tags"
              tagElement={(value) => {
                return(`${api_users[value].name} (${api_users[value].post_name})`)
              }}
            >
              {Object.entries(api_users).map((item, index) => {
                let user = item[1];
                return <Option key={index} value={user.id}>{`${user.name} (${user.post_name})`}</Option>
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

export default AttachUsersForm