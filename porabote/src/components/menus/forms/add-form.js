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
  SubmitButton
} from "porabote/form";

const AddForm = props => {

  const {menus} = props.dicts;

  const values = {
    link: '',
    name: '',
    parent_id: '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={props.addRecord}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          <Field>
            <Input
              label="Название"
              name="name"
            />
          </Field>
          <Field>
            <Input
              label="Ссылка"
              name="link"
            />
          </Field>

          <Field>
            <Select
              name="parent_id"
              label="Родитель"
            >
              {Object.keys(menus).map((id, index) => {
                let menu = menus[id];
                return <Option key={id} value={id}>{`${menus[id].name}`}</Option>
                }
              )}
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
};

AddForm.propTypes = {};

export default AddForm;