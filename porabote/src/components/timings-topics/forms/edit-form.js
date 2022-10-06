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
import TimingsTopics from "../models/TimingsTopics";

const EditForm = props => {

  const {speakers} = props.dicts;

  const values = props.data.attributes;
  if (values.datetime_from && values.datetime_to) {
    values.time_range = `${moment(values.datetime_from).format('HH:mm')}-${moment(values.datetime_to).format('HH:mm')}`;
    values.date = moment(values.datetime_from).format('YYYY-MM-DD');
  }

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
          <Input
            label="Время в секундах с начала видео"
            name="start_from"
          />
        </Field>
        {/*<Field>*/}
        {/*  <InputDate name="date" label="Дата"/>*/}
        {/*</Field>*/}

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

EditForm.propTypes = {};

export default EditForm;