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

const AddStep = (props) => {

  const {dicts} = useSelector(state => state.dicts);

  return (
    <Form
      values={{
        lft: 0,
      }}
      submitForm={(values) => {
        props.addStepSave(values);
      }}
      submitFormAfter={(resp) => {
        //window.location = `/porabote/business-events/view/${resp.data.id}`
        //this.props.fetchRecord()
      }}
    >

      <div>
        <Field>
          <Select
            name="user_id"
            label="Выбрать лицо"
          >
            {Object.entries(dicts.api_users).map((user, index) => {
              return <Option key={index} value={user[1]['id']}>
                {`${user[1]['name']} - ${user[1]['post_name']}`}
              </Option>;
            })}
          </Select>
        </Field>

        <Field>
          <Select
            name="lft"
            label="После шага"
            empty="В начало"
          >
            {Object.entries(props.steps).map((step, index) => {
              step = step[1];

              let {
                acceptor,
                default_step,
              } = step;

              let name = 'Не указано';

              if (acceptor) {
                name = acceptor.api_user.name;
              } else if (default_step) {
                name = default_step.name;
              }

              return <Option key={index} value={step['lft']}>{`${step['lft']} шаг - ${name}`}</Option>;
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
             props.removeModalItem(props.itemkey);
          }}
          style={{width: '140px', marginTop: '20px'}}
        />
      </SubmitButton>

    </Form>
  );
}

export default AddStep;