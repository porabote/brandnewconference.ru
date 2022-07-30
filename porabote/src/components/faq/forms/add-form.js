import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Field,
  Input,
  Textarea,
  Option,
  Select,
  SubmitButton
} from "porabote/form";

const AddForm = props => {

  const addRecord = (values) => {
    props.addRecord(values, props.itemkey);
  }

  const values = {
    link: '',
    name: '',
    parent_id: '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={addRecord}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Textarea
              label="Вопрос"
              name="question"
            />
          </Field>
          <Field>
            <Textarea
              label="Ответ"
              name="answer"
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