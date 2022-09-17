import React, {useState} from 'react';
import Api from "@services";
import {
  Form,
  Button,
  Field,
  Checkbox,
  Radio,
  RadioInput,
  SubmitButton
} from "@components/common/form";

const QuestionnairesModal = (props) => {

  let variants = props.data.variants || [];


  const [doneMsg, setDoneMsg] = useState(false);

  if (doneMsg) return doneMsg;

  const submitData = (values, formContext) => {

    Api.post(`/api/landing/method/vote/`, {
      body: values,
    })
      .then((resp) => {
        console.log(resp);
        setDoneMsg(<p>Спасибо, ваш голос учтён!</p>);
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

  let values = {
    questionnaires_id: props.data.id,
  };

  return (
    <div>
      <Form values={values} submitForm={submitData}>
        <h1 style={{marginLeft: '18px'}}>{props.data.question}</h1>
        <Field>
          <Radio label="Вопрос" name="variant_id">
            {variants.map(variant => {
              return (
                <RadioInput key={variant.id} value={variant.id} label={variant.name}/>
              );
            })}
          </Radio>
        </Field>

        <SubmitButton style={{marginLeft: '18px'}} className="btn btn-outline-dark">
            <span className="arrow-icon">Проголосовать</span>
        </SubmitButton>

      </Form>
    </div>
  );
};

export default QuestionnairesModal;