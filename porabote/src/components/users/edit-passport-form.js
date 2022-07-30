import React, {useEffect, useState} from "react";
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

const EditUserForm = (props) => {

  const [passport, setPassport] = useState(null);

  const {attributes} = props.data;
  const {departments, shifts, accounts} = props.dicts;

  const isMainDisable = props.isCanEdit ? false : true;

  let { isCanEdit } = props;

  useEffect(() => {
    props.getPassport(setPassport);
  }, []);

  if (!passport) return <p>Получение данных</p>

  return (
    <div>
      <Form
        values={passport}
        submitForm={values => props.editPassportSubmit(values, props.itemkey)}
        submitFormAfter={(resp) => {
          if( typeof resp.error != "undefined") {
            return dispatch(openConfirm(resp.error));
          }
          props.removeModalItem(props.itemkey);
          props.fetchData();
        }}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>

          <Field>
            <Input
              label="Имя"
              name="name"
            />
          </Field>
          <Field>
            <Input
              label="Фамилия"
              name="last_name"
            />
          </Field>
          <Field>
            <Input
              label="Отчество"
              name="patronymic"
            />
          </Field>


          <Field>
            <Input
              label="Номер"
              name="number"
            />
          </Field>
          <Field>
            <Input
              label="Серия"
              name="sery"
            />
          </Field>

          <Field>
            <InputDate
              label="Дата выдачи"
              name="date_of_issue"
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

export default EditUserForm;