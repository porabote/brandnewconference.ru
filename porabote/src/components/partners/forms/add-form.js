import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Field,
  Input,
  InputDate,
  InputHidden,
  TextArea,
  Option,
  Select,
  SubmitButton
} from "porabote/form";
import {Masks} from "porabote/form";

const AddForm = props => {

  const {speakers} = props.dicts;

  const values = {
    name: '',
    link: '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={props.addRecord}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Название"
              name="name"
            />
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Ссылка"
              name="link"
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