import React from 'react';
import PropTypes from 'prop-types';
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

const AddForm = props => {

  const {menus} = props.dicts;

  const values = {
    link: '',
    name: '',
    parent_id: '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={props.addRecord}
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
        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Должность"
              name="post_name"
            />
          </Field>
          <Field>
            <Input
              label="Цитата"
              name="quote"
            />
          </Field>
        </div>

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
};

AddForm.propTypes = {};

export default AddForm;