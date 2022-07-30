import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from 'react-router';
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
import { withDictsData } from "@hocs";
import AddObject from "@components/platforms/add-object"

const EquipmentsAddForm = (props) => {

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const history = useHistory();

  const { dicts } = useSelector(state => state.dicts);

  const {
    objects,
    organizations_own,
    platforms,
    equipments_types,
  } = dicts;

  let values = props.record || {
    id: null,
    name: '',
    factory_number: null,
    inventory_number: null,
    sap_number: null,
    vin_code: null,
    gos_number: null,
    release_date: null,
    operation_start: null,
    operation_end: null,
    type_id: null,
    organizations_own_id: 1,
    object_id: '',
    platform_id: '',
  };

  return (
    <div>

      <Form
        values={values}
        action="/api/equipments/add/"
        submitFormAfter={(resp) => {

          props.removeModalItem(props.itemkey);

          if (typeof props.getRecord == "function") { // If it edition
            props.getRecord();
          } else { // If it adding
            history.push(`/equipments/view/${resp.data.id}`);
          }

        }}
      >

        <Field>
          <Select
            name="organizations_own_id"
            label="Организация"
            empty={false}
          >
            {Object.entries(organizations_own).map((item, index) => {
              let itemData = item[1];
              return <Option key={index} value={itemData.id}>{itemData.name}</Option>;
            })}
          </Select>
        </Field>

        <Field>
          <Select
            name="platform_id"
            label="Площадка"
            afterSelectCallback={(e, form) => {
              setSelectedPlatform(form.values.platform_id);
            }}
          >
            {Object.entries(platforms).map((item, index) => {
              let itemData = item[1];
              return <Option key={itemData.id} value={itemData.id}>{itemData.ru_alias}</Option>;
            })}
          </Select>
        </Field>

        <Field>
          <Select
            name="object_id"
            label="Объект"
            afterSelectCallback={(e, form) => {
              setSelectedObject(form.values.object_id);
            }}
            // buttons={[
            //   <Button
            //     key={1}
            //     className="form-item__icon-plus"
            //     onClick={() => {
            //       props.pushItemToModal(
            //         <AddObject kind="self" platforms={platforms} />,
            //         'Добавить обьект',
            //       );
            //     }}
            //   />
            // ]}
          >
            {
              Object.entries(objects).map((item, index) => {
                let itemData = item[1];
                if (itemData.platform_id == selectedPlatform && itemData.kind != 'hole') {
                  return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
                }
              })
            }
          </Select>
        </Field>

        <Field>
          <Select
            name="hole_id"
            label="Скважина"
            // buttons={[
            //   <Button
            //     key={1}
            //     className="form-item__icon-plus"
            //     onClick={() => {
            //       props.pushItemToModal(
            //         <AddObject kind="hole" platforms={platforms} />,
            //         'Добавить скважину',
            //       );
            //     }}
            //   />
            // ]}
          >
            {
              Object.entries(objects).map((item, index) => {
                let itemData = item[1];
                if (itemData.parent_id == selectedObject && itemData.kind == 'hole') {
                  return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
                }
              })
            }
          </Select>
        </Field>

        <Field>
          <Input name="sap_number" label="SAP №"/>
        </Field>

        <Field>
          <Select name="type_id" label="Категория">
            {Object.entries(equipments_types).map((item, index) => {
              let itemData = item[1];
              return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
            })}
          </Select>
        </Field>

        <Field>
          <Input name="name" label="Наименование оборудования"/>
        </Field>
        <Field>
          <Input name="brand_name" label="Обозначение (тип, марка)"/>
        </Field>
        <Field>
          <Input name="factory_name" label="Завод-изготовитель"/>
        </Field>
        <Field>
          <Input name="vin_code" label="Зав.№ (VIN)"/>
        </Field>
        <Field>
          <Input name="inventory_number" label="Инв. №"/>
        </Field>
        <Field>
          <InputDate name="release_date" label="Дата изготовления"/>
        </Field>
        <Field>
          <InputDate name="operation_start" label="Дата ввода в эксплуатацию"/>
        </Field>
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

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirm: (msg, approveCallback, callbackData) => dispatch({
      type: "OPEN_CONFIRM",
      payload: {msg, approveCallback, callbackData},
    }),
    pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
  }
}
export default connect(null, mapDispatchToProps)(EquipmentsAddForm, { storeAlias: "equipments" });