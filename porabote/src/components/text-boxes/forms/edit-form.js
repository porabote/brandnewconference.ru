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
  SubmitButton,
  TextArea,
} from "porabote/form";

const EditForm = props => {

  const {menus} = props.dicts;

  const values = props.data.attributes;

  return (
    <div>
      <Form
        values={values}
        submitForm={() => props.editRecordConfirm(values, props.itemkey, props.getRecord)}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Описание/комментарий к тексту"
              name="desc"
            />
          </Field>

          <Field>
            <TextArea
              label="Текст"
              name="box_text"
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

EditForm.propTypes = {};

export default EditForm;