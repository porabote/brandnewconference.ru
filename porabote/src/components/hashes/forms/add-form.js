import React from 'react';
import PropTypes from 'prop-types';
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

const AddForm = props => {

 // const {menus} = props.dicts;

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

        <div className="fieldset" style={{gridTemplateColumns: '1fr 200px'}}>
          <Field>
            <Input
              label="Хэш"
              name="hash"
            />
          </Field>
          <Field>
            <Select
              name="part_format"
              label="Формат участия"
            >
              <Option key={1} value="online">Онлайн</Option>
              <Option key={2} value="offline">Офлайн</Option>
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