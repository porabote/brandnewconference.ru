import React, {useState, useEffect} from "react";
import {
  Form,
  Field,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";
import {
  StripedList,
  StripedListRow,
  StripedListCell,
  StripedDropMenu,
  StripedDropLink
} from 'porabote/striped-list';

const AcceptListBuilding = (props) => {

  let values = {steps: {}};

  const setFormValues = () => {
    props.steps.map(step => {
      let newItem = {};
      newItem[step.id.toString()] = {
        user_id: (step.acceptor != null) ? step.acceptor.api_user.id.toString() : '',
        step_default_id: step.step_default_id,
        id: step.id.toString(),
      };
      values.steps = Object.assign(values.steps, newItem);
      return;
    });
  }

  useEffect(() => {
    setFormValues();
  }, [props.isStepsLoaded]);

  let stepCount = 0;
  if (!props.isStepsLoaded) return('Данные загружаются');

  setFormValues();

  return (
    <Form
      values={values}
      submitForm={(values) => {
        props.setAcceptors(values);
      }}
      submitFormAfter={(resp) => {
        //window.location = `/porabote/business-events/view/${resp.data.id}`
        //this.props.fetchRecord()
      }}
    >

      <h1>Выбор подписных лиц</h1>

      {props.steps.map((step, index) => {

        stepCount++;

        let {
          acceptor,
          default_step,
        } = step;

        let name = 'Не указано';
        let users = {};

        if (acceptor) {
          name = acceptor.api_user.name
          users[acceptor.api_user.id] = `${acceptor.api_user.name} - ${acceptor.api_user.post_name}`;
        } else if (default_step) {
          name = default_step.name;
          default_step.default_users.map((user, index) => {
            users[user.api_user.id] = `${user.api_user.name} - ${user.api_user.post_name}`;
          });
        }

        return (
          <div style={{
            gridTemplateColumns: '50px 450px',
            maxWidth: '550px',
            display: 'grid',
            alignItems: 'center'
          }} key={index}>

            <div style={{paddingTop: '29px'}}>
              <StripedDropMenu>
                <div
                  onClick={() => {
                    props.deleteStep(step.id);
                  }}
                >
                  Удалить
                </div>
              </StripedDropMenu>
            </div>

            <div key={index}>
              <Field>
                <Select
                  name={`steps.${step.id}.user_id`}
                  label={`${stepCount} ${name}`}
                  empty={false}
                >
                  {Object.entries(users).map((user, index) => {
                    return <Option key={index} value={user[0]}>{user[1]}</Option>;
                  })}
                </Select>
              </Field>
            </div>
          </div>
        )
      })}

      <div style={{
        gridTemplateColumns: '360px 250px',
        display: 'grid',
        alignItems: 'center'
      }}>

        <Button
          text="Добавить шаг"
          className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
          type="button"
          onClick={() => {
            props.addStep();
          }}
          style={{width: '160px', marginTop: '20px'}}
        />

        <SubmitButton>
          <Button
            text="Сохранить"
            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
            type="button"
            // onClick={() => {
            //
            //   this.props.getRecord();
            //   this.props.removeModalItem(this.props.itemkey)
            // }}
            style={{width: '140px', marginTop: '20px'}}
          />
        </SubmitButton>

      </div>
    </Form>
  );
}

export default AcceptListBuilding;