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
import {Masks} from "porabote/form";
import TimingsTopics from "../models/TimingsTopics";

const AddForm = props => {

  const {speakers} = props.dicts;

  const values = {
    name: '',
    timing_id: props.timingId || '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={(values) => TimingsTopics.save(values, () => {
          props.callback(props.itemkey);
        })}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Описание"
              name="desc"
            />
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Описание короткое"
              name="desc_short"
            />
          </Field>
        </div>

        <Field>
          <InputDate name="date" label="Дата"/>
        </Field>

        <div className="fieldset" style={{gridTemplateColumns: '1fr 1fr'}}>
          <Field>
            <Input
              mask={Masks.timeRange}
              label="Время - начало / Время - окончание"
              name="time_range"
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

AddForm.propTypes = {};

export default AddForm;