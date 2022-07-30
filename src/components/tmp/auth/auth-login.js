import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {check, login} from './auth-service'
import {
  Form,
  Field,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
} from 'porabote/form'
import './auth.less'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const AuthLogin = (props) => {

  const state = {
    account_alias: 'porabote',
    username: 'maksimov_den@mail.ru',
    password: 'z7893727',
    account_id: '4',
  }

  if(!props.isDictsLoaded) return <div>Загрузка</div>

  return (
    <div className="box login">

      <h1 style={{marginLeft: '10px'}}>
        <AccountCircleOutlinedIcon style={{fontSize: '34px', marginRight: '13px', color: '#DBDBDB'}}/>
        Авторизация
      </h1>

      <div className="box-body">

        <Form
          submitForm={props.login}
          values={state}
        >

          <Field>
            <Input
              label="E-mail"
              name="username"
            />
          </Field>

          <Field>
            <Input
              placeholder="***"
              label="Пароль"
              name="password"
              type="password"
            />
          </Field>

          <Field>
            <Select
              label="Аккаунт"
              name="account_id"
              empty={false}
            >
              {props.isDictsLoaded &&
                Object.entries(props.dicts.accounts).map((item) => {
                  let data = item[1];
                  return <Option value={data.id} key={data.id}>{data.name}</Option>
                })
              }
            </Select>
          </Field>

          <div style={{padding: '10px 0'}}>
            <SubmitButton>
              <Button
                text="Войти"
                className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                type="button"
                style={{width: '140px', marginTop: '20px'}}
              />
            </SubmitButton>
          </div>

          <div style={{
            padding: '15px 0',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}>

            <NavLink to={"/auth/forgotPassword/"}>Восстановить пароль</NavLink>

          </div>

        </Form>

      </div>

    </div>

  );
}

export default AuthLogin