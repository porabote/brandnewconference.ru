import React, {useEffect} from "react";
import {useSelector} from 'react-redux';

import {
  Form,
  Field,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";

const ChangeAcceptorForm = (props) => {

  const {dicts} = useSelector(state => state.dicts);

  return (
    <Form
      values={{
        step: props.step,
        user_id: '',
      }}
      submitForm={(values) => {
        props.changeAcceptorAfterConfirm(values, props.itemkey, props.step);
      }}
    >

      <div>
        <Field>
          <Select
            name="user_id"
            label={`Заменить персону ${props.step.acceptor.api_user.name} на`}
          >
            {Object.entries(dicts.api_users).map((user, index) => {
              return <Option key={index} value={user[1]['id']}>
                {`${user[1]['name']} - ${user[1]['post_name']}`}
              </Option>;
            })}
          </Select>
        </Field>

      </div>


      <SubmitButton>
        <Button
          text="Сохранить"
          className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
          type="button"
          onClick={() => {
            //props.removeModalItem(props.itemkey);
          }}
          style={{width: '140px', marginTop: '20px'}}
        />
      </SubmitButton>

    </Form>
  );
}

export default ChangeAcceptorForm;