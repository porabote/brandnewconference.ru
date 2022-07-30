import React from 'react';
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

const EditForm = (props) => {

  const values = props.data.attributes;

  const editRecordConfirm = (values) => {
    props.editRecordConfirm(values, props.itemkey, props.getRecord);
  }

  return (
    <div>
      <Form
        values={values}
        submitForm={editRecordConfirm}
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
}

export default EditForm;