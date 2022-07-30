import React from 'react';
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Textarea,
} from 'porabote/form';
import Api from '@services';

const EditDescription = (props) => {
console.log(props)
  return (
    <div>
      <Form
        values={{
          id: props.id,
          dscr: props.dscr,
        }}
        submitForm={(values) => props.editDescriptionSubmit(values.id, values.dscr, props.itemkey)}
      >
        <Field>
          <Textarea label="Комментарий" name="dscr"/>
        </Field>

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
  )
}

export default EditDescription;