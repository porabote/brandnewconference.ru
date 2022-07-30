import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { openConfirm } from "porabote/confirm/store/confirm-actions"
import Api from "@services";
import {
  Form,
  Button,
  Field,
  Input,
  SubmitButton
} from "porabote/form";

const ConfirmInvitation = (props) => {

  const dispatch = useDispatch();

  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);

  const [state, setState] = useState({});

  useEffect(() => {
    getRequestData();
    return () => {
      setState({});
    };
  }, []);

  let getRequestData = () => {

    const { token, requestId } = props;

    Api.post(`/api/users/method/confirmInvitation`, {
      body: { token, requestId },
    }).then((resp) => {
      if (typeof resp.error != "undefined") {
        setError(resp.error);
      } else {
        setRequest(resp.data);
      }
    })
  }

  let submitForm = (values) => {
    if (values.password.length < 4) {
      dispatch(openConfirm('Пароль слишком короткий. Минимум 4 символа.'));
      return;
    } else if (values.password !== values.password_confirm) {
      dispatch(openConfirm('Пароли не совпадают.'));
      return;
    }
    Api.post(`/api/users/method/confirmInvitation`, {
      body: values,
    }).then((resp) => {
      //console.log(resp);
      window.location = '/users/login/';
      // if (typeof resp.error != "undefined") {
      //   setError(resp.error);
      // } else {
      //   setRequest(resp.data);
      // }
    })
  }

  if (error) {
    return <div className="content" style={{padding: "40px"}}>
      {error}
    </div>
  }

  if (!request) {
    return <div className="content" style={{padding: "40px"}}>Запрос обрабатывается</div>
  }

  return (
    <div className="content" style={{padding: "40px"}}>

      <h1>Пожалуйста, для входа в систему придумайте и введите пароль</h1>

      <Form
        values={{
          requestId: request.id,
          token: request.token,
          password: '',
          password_confirm: '',
        }}
        submitForm={submitForm}
        submitFormAfter={(resp) => {

          //props.removeModalItem(props.itemkey);
          //props.fetchData();
        }}
      >
        <Field>
          <Input
            label="Пароль"
            name="password"
          />
        </Field>
        <Field>
          <Input
            label="Пароль повторно"
            name="password_confirm"
          />
        </Field>

        <SubmitButton>
          <Button
            text="Подтвердить"
            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
            type="button"
            style={{width: '140px', marginTop: '20px'}}
          />
        </SubmitButton>

      </Form>
    </div>
  );
}

ConfirmInvitation.propTypes = {};

export default ConfirmInvitation;