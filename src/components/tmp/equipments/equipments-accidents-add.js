import React, { Component } from "react";
import {
    Form,
    Field,
    Input,
    Button,
    SubmitButton,
    Select,
    Option,
    InputDate,
    Textarea,
    Masks,
} from 'porabote/form';
import Api from "@services/api-service";

class EquipmentsAccidentsAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statuses: {},
            loading: true,
            values: props.data || {
                equipment_id: props.record.id,
                date_at: '',
                date_to: '',
                count: '',
            }
        }
    }

    submitForm = (values) => {

        Api.get(
            `/api/equipments/method/addEquipmentsAccident/`,
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
                    submitForm={this.submitForm}
                    submitFormAfter={(resp) => {
                        //window.location = `/porabote/business-events/view/${resp.data.id}`
                        this.props.removeModalItem(this.props.itemkey);
                        this.props.getRecord();
                    }}
                >

                    <Field>
                        <InputDate name="date" label="Дата аварии"/>
                    </Field>
                    <Field>
                        <Input name="act_number" label="Номер акта"/>
                    </Field>

                    <Field>
                        <Textarea grid="grid" name="details" label="Сущность аварии"/>
                    </Field>
                    <Field>
                        <Textarea grid="grid" name="reasons" label="Причины аварии"/>
                    </Field>

                    <Field>
                        <Input
                          name="downtime"
                          label="Время простоя"
                          mask={(value) => {
                              return Masks.digitalOnly(value);
                          }}
                        />
                    </Field>

                    <Field>
                        <Textarea grid="grid" name="measures" label="Меры по устранению"/>
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

export default EquipmentsAccidentsAdd;