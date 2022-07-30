import React, { Component } from 'react'
import { useSelector } from "react-redux";
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

const ReportsAddForm = (props) => {


    const {dicts} = useSelector(state => state.dicts);
        const { departments, report_types } = dicts

        return (
            <div>

                <Form
                    values={{
                        id: null,
                        comment: '',
                        date_period: null
                    }}
                    action="/api/reports/add/"
                    submitFormAfter={(resp) => {
                        window.location = `/porabote/reports/view/${resp.data.id}`
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
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </SubmitButton>

                </Form>
            </div>

        )

}

export default ReportsAddForm