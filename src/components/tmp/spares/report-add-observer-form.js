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

class SparesAddObserver extends Component {

    state = {
        users: [],
        values: {
            users: [],
            entity_id: this.props.record_id,
            component_id: 1
        }
    }

    componentDidMount() {

        Api.get(
            `/api/api-users/get/`
        ).then((data) => {

            let users_list = {};
            data.data.map(item => {
                users_list[item.id] = item;
            })

            this.setState({
                users: (typeof data.data !== 'undefined') ? data.data : [],
                users_list
            })
        })

    }

    render() {

        if (this.state.users.length == 0) return <p>Данные загружаются...</p>;

        //const { departments, report_types } = this.state.dicts

        return (
            <div>

                <Form
                    values={this.state.values}
                    action="/api/observers/method/addByComponentId/"
                    submitFormAfter={(resp) => {
                        //window.location = `/porabote/business-events/view/${resp.data.id}`
                    }}
                >
                    <Field>
                        <Select
                            name="users"
                            label="Пользователи"
                            mode="tags"
                            tagElement={(value) => {
                                return(`${this.state.users_list[value].attributes.name} (${this.state.users_list[value].attributes.post_name})`)
                            }}
                        >
                            {this.state.users.map((user, index) => {
                                return <Option key={index} value={user.id}>{`${user.attributes.name} (${user.attributes.post_name})`}</Option>
                            })}
                        </Select>
                    </Field>



                    <SubmitButton>
                        <Button
                            text="Сохранить"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            onClick={() => {
                                this.props.removeModalItem(this.props.itemkey)
                                this.props.fetchRecord()
                            }}
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </SubmitButton>
                </Form>
            </div>
        )
    }

}

export default SparesAddObserver