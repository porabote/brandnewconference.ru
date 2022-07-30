import React, {Component} from "react";
import {connect} from "react-redux";
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

class PlatformsAddForm extends Component {

  render() {
console.log(this.props.dicts);
    const {departments, report_types} = this.props.dicts;

    return (
      <div>

        <Form
          values={{
            id: null,
            comment: '',
            date_period: null
          }}
          action="/api/platforms/add/"
          submitFormAfter={(resp) => {
            window.location = `/porabote/platforms/view/${resp.data.id}`
            //OR
            //this.props.removeModalItem(this.props.itemkey);
            //this.props.fetchData();
          }}
        >

          {/*<Field>*/}
          {/*  <InputDate name="date_period" label="На дату"/>*/}
          {/*</Field>*/}

          {/*<Field>*/}
          {/*  <InputHidden*/}
          {/*    name="id"*/}
          {/*  />*/}
          {/*</Field>*/}
          <Field>
            <Input
              label="Название"
              name="name"
            />
          </Field>
          {/*<Field>*/}
          {/*  <Select*/}
          {/*    name="object_id"*/}
          {/*    label="Обьект"*/}
          {/*  >*/}
          {/*    {Object.keys(departments).map((id) => {*/}
          {/*      if (departments[id].custom_type == 5) {*/}
          {/*        return <Option key={id} value={id}>{departments[id].name}</Option>*/}
          {/*      }*/}
          {/*    })}*/}
          {/*  </Select>*/}
          {/*</Field>*/}

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

    )
  }

}

const mapStateToProps = (state) => {
  return ({
    dicts: state.dicts.dicts
  })
}

export default connect(mapStateToProps)(PlatformsAddForm)