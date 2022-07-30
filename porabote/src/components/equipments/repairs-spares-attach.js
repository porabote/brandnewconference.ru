import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Field,
  Input,
  Button,
  SubmitButton,
  Masks,
} from 'porabote/form';
import Api from "@services/api-service";

class RepairsSparesAttach extends PureComponent {

  submitForm = (values) => {

    if (parseInt(values.count) > parseInt(this.props.spare.attributes.quantity)) {
      alert('Выбранное количество превышает остаток на складе!');
      return;
    }
    Api.post(
      `/api/spares/method/attachToRepair/`,
      {
        body: values,
      }
    ).then((data) => {
      this.props.getRecord();
      this.props.removeModalItem(this.props.itemkey);
      this.props.getSpares();
    })
  }

  render() {
    let { store } = this.props.spare.relationships;

    const storeName = (typeof store != "undefined") ? store.attributes.name : this.props.spare.attributes.store.name;

    return (
      <div>
        <Form
          values={{
            spare_id: this.props.spare.id,
            repair_id: this.props.repair.id,
            count: this.props.count,
          }}
          submitForm={this.submitForm}
        >
        <h3>Зачасть: {this.props.spare.attributes.name}</h3>
          <h6>{storeName}. Остаток {this.props.spare.attributes.quantity}.</h6>

          <Field>
            <Input
              name="count"
              label="Количество"
              mask={(value) => {
                return Masks.digitalOnly(value);
              }}
            />
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
}

RepairsSparesAttach.propTypes = {};

export default RepairsSparesAttach;