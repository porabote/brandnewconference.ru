import React from "react";
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
  
  const {attributes} = props.data;
  const {departments, shifts, accounts, cities} = props.dicts;

  const isMainDisable = props.isCanEdit ? false : true;

  let { isCanEdit } = props;

  const disabled = (values) => {
    return isCanEdit ? false : true;
  };

  const genderList = {'m': 'Муж.', 'f': 'Жен.'};
  const statusList = {
    new: 'Новый',
    invited: 'Приглашен в систему',
    external: 'Внешний сотрудник (Аутсорсинг)',
    active: 'Активен',
    fired: 'Уволен',
  };

  return (
    <div>
      <Form
        values={attributes}
        submitForm={values => props.editUserConfirm(values, props.itemkey, props.getRecord)}
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
              disabled={disabled}
              label="Фамилия Имя"
              name="name"
            />
          </Field>
          <Field>
            <Input
              disabled={disabled}
              label="Отчество"
              name="patronymic"
            />
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <Input
              disabled={() => true}
              label="Email/Логин"
              name="email"
            />
          </Field>

          <Field>
            <Input
              disabled={() => {
                return (isCanEdit || props.isItOwn) ? false : true;
              }}
              label="Email дополнительный"
              name="email_extra"
            />
          </Field>

          <Field>
            <Input
              disabled={() => {
                return (isCanEdit || props.isItOwn) ? false : true;
              }}
              label="Телефон"
              name="phone"
            />
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <Input
              disabled={disabled}
              label="Название должности"
              name="post_name"
            />
          </Field>


          <Field>
            <Select
              disabled={disabled}
              name="department_id"
              label="Департамент"
            >
              {Object.keys(departments).map((id) => {
                if (departments[id].label != 'platform' && departments[id].label != 'object')
                  return <Option key={id} value={id}>
                      {`${accounts[departments[id].account_id].ru_name} - ${departments[id].name}`}
                  </Option>
              })}
            </Select>
          </Field>

          <Field>
            <Select
              disabled={disabled}
              name="shift_id"
              label="Вахта"
            >
              {Object.keys(shifts).map((id) => {
                  return <Option key={id} value={id}>{`${shifts[id].title})`}</Option>
              })}
            </Select>
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <InputDate
              disabled={disabled}
              label="Дата рождения"
              name="date_birth"
            />
          </Field>

          <Field>
            <Select
              disabled={() => {
                return (isCanEdit || props.isItOwn) ? false : true;
              }}
              name="sex"
              label="Пол"
            >
              {Object.keys(genderList).map((id) => {
                  return <Option key={id} value={id}>{`${genderList[id]}`}</Option>
              })}
            </Select>
          </Field>

          <Field>
            <Select
              disabled={() => {
                return (isCanEdit || props.isItOwn) ? false : true;
              }}
              name="status"
              label="Статус"
            >
              {Object.keys(statusList).map((id) => {
                return <Option key={id} value={id}>{`${statusList[id]}`}</Option>
              })}
            </Select>
          </Field>
        </div>


        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>


          <Field>
            <Select
              disabled={disabled}
              name="city_id"
              label="Город"
            >
              {Object.keys(cities).map((id) => {
                return <Option key={id} value={id}>
                  {`${cities[id].name_ru} - ${cities[id].name_en}`}
                </Option>
              })}
            </Select>
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