import React from 'react';
import Api from "@services";
import {
  Form,
  Button,
  Field,
  Input,
  InputDate,
  InputHidden,
  Option,
  Select,
  Checkbox,
  TextArea ,
  Radio,
  RadioInput,
  SubmitButton
} from "@components/common/form";
import ButtonArrowIcon from './svg/reg-file-button-arrow.svg';

const FeedbackForm = () => {

  const submitData = (values, formContext) => {

    Api.post(`/api/landing/method/createQuestion/`, {
      body: values,
    })
      .then((resp) => {
        // if (typeof resp.error != "undefined" && resp.error.length > 0) {
        //   dispatch(openModal(<RegistrationNotices>{resp.error}</RegistrationNotices>, 'Регистрация'));
        // } else if (typeof resp.data.consumer != "undefined") {
        //   showSuccessMsg(resp.data.consumer);
        //
        //   Object.keys(values).map((fieldName) => {
        //     formContext.setFieldValue(fieldName, '');
        //   });
        // } else {
        //   dispatch(openModal(<RegistrationNotices msg="Ошибка регистрации"/>, 'Регистрация'));
        // }
      });
  }

  return (
    <div>
      <Form
        values={{
          name: '',
          email: '',
          question: '',
        }}
        submitForm={submitData}
      >
        <Field>
          <Input
            label="Имя *"
            name="name"
          />
        </Field>
        <Field>
          <Input
            label="Email *"
            name="email"
          />
        </Field>
        <Field>
          <TextArea
            label="Вопрос *"
            name="question"
          />
        </Field>

        <div style={{padding: '20px 0'}}>
        <SubmitButton>
          <Button
            text=""
            className="registration-submit"
            type="button"
          >
            <img className="registration-submit__arrow" src={ButtonArrowIcon}></img>
          </Button>
        </SubmitButton>
        </div>

      </Form>
    </div>
  );
};

export default FeedbackForm;