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

const AddForm = props => {

  const {speakers} = props.dicts;

  const values = {
    name: '',
    start_from: '',
    desc_player: '',
    desc_list: '',
    speaker_id: '',
    datetime_from: '',
    datetime_to: '',
  };

  return (
    <div>
      <Form
        values={values}
        submitForm={props.addRecord}
      >

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Заголовок для блока расписание"
              name="desc_list"
            />
          </Field>
        </div>

        <div className="fieldset" style={{gridTemplateColumns: '1fr'}}>
          <Field>
            <Input
              label="Заголовок для плеера"
              name="desc_player"
            />
          </Field>
        </div>

        {/*<Field>*/}
        {/*  <Input*/}
        {/*    label="Время в секундах с начала видео"*/}
        {/*    name="start_from"*/}
        {/*  />*/}
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
        {/*<div className="fieldset" style={{gridTemplateColumns: '1fr'}}>*/}

        {/*  <Field>*/}
        {/*    <Select*/}
        {/*      name="speaker_id"*/}
        {/*      label="Спикер"*/}
        {/*    >*/}
        {/*      {Object.keys(speakers).map((id, index) => {*/}
        {/*          let speaker = speakers[id];*/}
        {/*          return <Option key={id} value={id}>{`${speakers[id].name} ${speakers[id].last_name}`}</Option>*/}
        {/*        }*/}
        {/*      )}*/}
        {/*    </Select>*/}
        {/*  </Field>*/}


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