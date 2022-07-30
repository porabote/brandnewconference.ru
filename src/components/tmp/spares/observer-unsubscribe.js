import React, { Component } from 'react'
import {
    Form,
    Field,
    InputHidden,
    Checkbox,
    Button,
    SubmitButton,
} from 'porabote/form';
import Api from '@services/api-service'

class ObserverUnsubscribe extends Component {

    state = {
        users: [],
        events: [],
        loading: true,
        values: {
            events: {},
            entity_id: this.props.record_id,
            user_id: this.props.user_id,
        }
    }

    componentDidMount() {

        Api.get(
            `/api/business-events/method/getByComponentId/1`
        ).then((data) => {
            let events = (typeof data.data !== 'undefined') ? data.data : []
            this.getSubscribesByComponentId(events)
        })
    }

    getSubscribesByComponentId = (events) => {
        Api.post(
            `/api/observers/method/getSubscribesByComponentId/`,
            {
                body: {
                    entity_id: this.props.record_id,
                    user_id: this.props.user_id,
                    component_id: 1
                }
            }
        ).then((data) => {

            let eventSubscribed = {}
            data.data.map(event => {
                eventSubscribed[event['business_event_id']] = event['business_event_id'];
            })

            this.setState({
                events,
                values: {...this.state.values, events: eventSubscribed },
                loading: false
            })
        })
    }

    render() {

        if (this.state.loading) return <p>Данные загружаются...</p>;

        return (
            <div>

                <Form
                    values={this.state.values}
                    action="/api/observers/method/unsubscribe/"
                    submitFormAfter={(resp) => {
                        this.props.removeModalItem(this.props.itemkey)
                        this.props.fetchRecord()
                    }}
                >

                    {
                        this.state.events.map((event, index) => {

                            return(
                                <Field key={index}>
                                    <Checkbox
                                        value={event.id}
                                        label={event.name}
                                        name={`events.${event.id}`}
                                        initChecked={typeof this.state.values.events[event.id] === "undefined" ? false : true}
                                    />
                                </Field>
                            )
                        })
                    }

                    <SubmitButton>
                        <Button
                            text="Отписать от выделенных"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            onClick={() => {
                                //this.props.removeModalItem(this.props.itemkey)
                                //this.props.fetchRecord()
                            }}
                            style={{width: '250px', marginTop: '20px'}}
                        />
                    </SubmitButton>
                </Form>
            </div>
        )
    }

}

export default ObserverUnsubscribe