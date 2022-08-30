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
import {Masks} from "porabote/form"

const EditForm = props => {

  const {menus} = props.dicts;

  const values = props.data.attributes;

  return (
    <div>
      <Form
        values={values}
        submitForm={props.editRecordConfirm}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Заголовок"
              name="name"
            />
          </Field>
          {/*<Field>*/}
          {/*  <Input*/}
          {/*    label="Время в секундах с начала видео"*/}
          {/*    name="start_from"*/}
          {/*  />*/}
          {/*</Field>*/}

        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr'}}>
          <Field>
            <Input
              mask={Masks.timeRange}
              label="Время - начало / Время - окончание"
              name="datetime_to"
              placeholder="00:00-00:00"
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