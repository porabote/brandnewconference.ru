import React, { Component } from 'react'
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate
} from 'porabote/form';
import Api from '@services/api-service'

class ChangeStatus extends Component {

  state = {
    statuses: {},
    loading: true,
    status_id: '',
    values: {
      equipment_id: this.props.record_id,
      status_id: '',
      status_reason_id: '',
    }
  }

  componentDidMount() {
    this.fetchStatuses();
  }

  fetchStatuses = () => {
    Api.get(
      `/api/statuses/get/`,
      {
        query: {
          whereIn: {
            model_alias: [
              'equipments',
              'equipments_reason'
            ],
          }
        },
      }
    ).then((data) => {

      let statuses = {
        equipments: [],
        equipments_reason: [],
      };
      data.data.map((item) => {
        statuses[item.attributes.model_alias].push(item.attributes);
      });

      this.setState({
        statuses,
        loading: false,
      })
    })
  }

  submitForm = (values) => {

    Api.get(
      `/api/equipments/method/changeStatus/`,
      {
        query: values,
      }
    ).then((data) => {
      this.props.getRecord();
    })
  }

  render() {

    if (this.state.loading) return <p>Данные загружаются...</p>;

    return (
      <div>
        <Form
          values={this.state.values}
          action="/api/observers/method/subscribe/"
          submitForm={this.submitForm}
          submitFormAfter={(resp) => {
            //window.location = `/porabote/business-events/view/${resp.data.id}`
            //this.props.fetchRecord()
          }}
        >

            <Field>
              <Select
                name="status_id"
                label="Статус"
                afterSelectCallback={(e, formContext) => {
                  this.setState({
                    status_id: formContext.values.status_id
                  });
                }}
              >
                {this.state.statuses.equipments.map((item, index) => {
                  return <Option key={index} value={item.id}>{`${item.name}`}</Option>
                })}
              </Select>
            </Field>


          {this.state.status_id == 59 &&
            <Field>
              <Select
                name="status_reason_id"
                label="Причина"
              >
                {this.state.statuses.equipments_reason.map((item, index) => {
                  return <Option key={index} value={item.id}>{`${item.name}`}</Option>
                })}
              </Select>
            </Field>
          }

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {
                this.props.removeModalItem(this.props.itemkey)
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default ChangeStatus