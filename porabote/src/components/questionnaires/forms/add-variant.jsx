import React from 'react';
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
import QuestionnairesVariants from "../models/QuestionnairesVariants";

const AddVariant = (props) => {

  let record = props.record || {questionnaires_id: props.data.id};
console.log(record)
  const values = record;

  return (
    <div>
      <Form
        values={values}
        submitForm={(values) => QuestionnairesVariants.save(values, () => {
          props.callback(props.itemkey);
        })}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Вариант"
              name="name"
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

export default AddVariant;