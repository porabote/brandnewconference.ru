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
  SubmitButton,
  InputTimeRange,
} from "porabote/form";
import {Masks} from "porabote/form";
import moment from "moment";

const EditForm = props => {

  const {menus} = props.dicts;

  const values = props.data.attributes;
  values.time_range = `${moment(values.datetime_from).format('HH:mm')}-${moment(values.datetime_to).format('HH:mm')}`;
  values.date = moment(values.datetime_from).format('YYYY-MM-DD');

  return (
    <div>
      <Form
        values={values}
        submitForm={() => props.editRecordConfirm(values, 0, props.getRecord)}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Вопрос"
              name="question"
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

EditForm.propTypes = {};

export default EditForm;