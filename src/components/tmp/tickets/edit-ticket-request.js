import React from "react";
import {useSelector} from 'react-redux';
import {
  Form,
  Field,
  Input,
  InputDate,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";

const EditTicketRequest = (props) => {

  const {dicts} = useSelector(state => state.dicts);

  return(
    <div>
      <Form
        values={props.data}
        submitForm={(values) => {
          props.editTicketsRequestSubmit(values, props.itemkey, props.fetchData);
        }}
      >

        <Field>
          <Select
            name="city_to_id"
            label="Город прибытия"
            empty={false}
          >
            {Object.entries(dicts.cities).map((item, index) => {
              let itemData = item[1];
              return <Option key={index} value={itemData.id}>{`${itemData.name_ru} - ${itemData.name_en}`}</Option>;
            })}
          </Select>
        </Field>

        <Field>
          <Select
            name="passport_type"
            label="Документ"
            empty={false}
          >
            <Option key="0" value="russian">Паспорт РФ</Option>
            <Option key="1" value="foreign">Заграничный паспорт</Option>
          </Select>
        </Field>

        <Field>
          <InputDate name="date" label="Дата вылета"/>
        </Field>

        <Field>
          <Input name="comment" label="Объект"/>
        </Field>

        <SubmitButton>
          <Button
            text="Сохранить"
            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
            type="button"
            onClick={() => {

              // this.props.getRecord();
              // this.props.removeModalItem(this.props.itemkey)
            }}
            style={{width: '140px', marginTop: '20px'}}
          />
        </SubmitButton>

      </Form>
    </div>
  );  
}

export default EditTicketRequest;