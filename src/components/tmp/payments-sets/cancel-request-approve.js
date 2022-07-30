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

class PaymentRepeat extends React.Component {

    render() {

        return(
            <div>
                <Form
                    values={{
                        id: this.props.item.id,
                        comment: ''
                    }}
                    submitFormAfter={(response) => {
                        this.props.removeModalItem(this.props.itemkey)
                        this.props.fetchData()
                    }}
                    action={`/api/payments/method/cancelRequestApprove/${this.props.item.id}`}
                >

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


                    <SubmitButton>
                        <Button
                            text="Подтвердить"
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

export default PaymentRepeat