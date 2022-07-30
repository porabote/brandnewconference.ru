import React, { Component } from 'react'
import {
  Form,
  Field,
  InputHidden,
  Input,
  Button,
  SubmitButton,
  Textarea,
} from 'porabote/form';
import Api from '@services/api-service'

class FilesEditInfo extends Component {

  state = {
    statuses: {},
    loading: true,
    values: {
      id: this.props.data.id,
      dscr: this.props.data.dscr,
    }
  }

  submitForm = (values) => {

    Api.get(
      `/api/files/method/changeFileInfo/`,
      {
        query: values,
      }
    ).then((data) => {
      this.props.getRecord();
    })
  }

  render() {

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
            <InputHidden name="id"/>
          </Field>
          <Field>
            <Textarea label="Описание" name="dscr"/>
          </Field>

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {
                this.props.removeModalItem(this.props.itemkey);
                this.props.getRecord();
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default FilesEditInfo