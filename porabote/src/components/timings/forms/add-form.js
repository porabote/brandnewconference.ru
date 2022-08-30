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
              label="Время - начало"
              name="datetime_from"
            />
          </Field>
          <Field>
            <Input
              label="Время - окончание"
              name="datetime_to"
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

        {/*  <Field>*/}
        {/*    <TextArea*/}
        {/*      label="Описание для плеера"*/}
        {/*      name="desc_player"*/}
        {/*    />*/}
        {/*  </Field>*/}
        {/*  <Field>*/}
        {/*    <TextArea*/}
        {/*      label="Описание для списка"*/}
        {/*      name="desc_list"*/}
        {/*    />*/}
        {/*  </Field>*/}
        {/*</div>*/}

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