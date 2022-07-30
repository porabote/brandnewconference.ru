import React, {useEffect} from "react";
import {useSelector} from 'react-redux';

import {
  Form,
  Field,
  Input,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";

const DeclineStepForm = (props) => {

  return (
    <Form
      values={{
        comment: '',
        stepId: props.stepId
      }}
      submitForm={(values) => {
        props.declineStepAfterConfirm(values, props.itemkey);
      }}
    >

      <div>
        <Field>
          <Input name="comment" label="Причина отклонения:"/>
        </Field>
      </div>


      <SubmitButton>
        <Button
          text="Сохранить"
          className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
          type="button"
          onClick={() => {

            // this.props.getRecord();
            // this.props.removeModalItem(this.props.itemkey)
          }}
          style={{width: '140px', marginTop: '20px'}}
        />
      </SubmitButton>

    </Form>
  );
}

export default DeclineStepForm;