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
} from 'porabote/form'

class ObserversAddForm extends Component {

    state = {
        dicts: []
    }

    componentDidMount() {

        const dicts = {}

        this.props.dicts.map(data => {
            dicts[data.attributes.assoc_table] = data.list
        })

        this.setState({
            dicts: dicts
        })
    }

    render() {

        if (this.state.dicts.length == 0) return <p>Данные загружаются...</p>;

        const { departments, report_types } = this.state.dicts

        return (
            <div>

                <Form
                    values={{
                        id: null,
                        comment: '',
                        date_period: null
                    }}
                    action="/api/observers/add/"
                    submitFormAfter={(resp) => {
                        window.location = `/porabote/observers/view/${resp.data.id}`
                    }}
                >

                    <Field>
                        <InputDate name="date_period" label="На дату" />
                    </Field>

                    <Field>
                        <InputHidden
                            name="id"
                        />
                    </Field>

                    <Field>
                        <Input
                            label="Комментарий"
                            name="comment"
                        />
                    </Field>

                    <Field>
                        <Select
                            name="type_id"
                            label="Тип отчета:"
                        >
                            {Object.keys(report_types).map((id) => {
                                return <Option key={id} value={id}>{report_types[id].name}</Option>
                            })}
                        </Select>
                    </Field>

                    <Field>
                        <Select
                            name="object_id"
                            label="Обьект"
                        >
                            {Object.keys(departments).map((id) => {
                                if (departments[id].custom_type == 5) {
                                    return <Option key={id} value={id}>{departments[id].name}</Option>
                                }
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

export default ObserversAddForm