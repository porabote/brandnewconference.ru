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
import Api from '@services/api-service';

class BusinessEventsAddForm extends Component {

    state = {
        dicts: [],
        loading: true
    }

    componentDidMount() {

        Api.get(
          `/api/components/get/`
        ).then((resp) => {
            this.setState({
                dicts: {
                    components: resp.data,
                },
                loading: false,
            })
        })
    }

    render() {

        if (this.state.loading) return <p>Данные загружаются...</p>;

        const { components } = this.state.dicts

        return (
            <div>

                <Form
                    values={{
                        component_id: null,
                        name: '',
                    }}
                    action="/api/business-events/add/"
                    submitFormAfter={(resp) => {
                        window.location = `/porabote/business-events/view/${resp.data.id}`
                    }}
                >

                    <Field>
                        <Input
                            label="Название"
                            name="name"
                        />
                    </Field>

                    <Field>
                        <Select
                            name="component_id"
                            label="Модуль"
                        >
                            {Object.keys(components).map((id) => {
                                return <Option key={id} value={components[id].id}>{components[id].attributes.description}</Option>
                            })}
                        </Select>
                    </Field>



                    <SubmitButton>
                        <Button
                            text="Сохранить"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            onClick={() => {
                                //this.props.removeModalItem(this.props.itemkey)
                                //this.props.fetchData()
                            }}
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </SubmitButton>
                </Form>
            </div>

        )
    }

}

export default BusinessEventsAddForm