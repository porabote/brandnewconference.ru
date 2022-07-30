import React from 'react'
import { Form, Field, Textarea, InputBare, Button } from 'porabote/form'

class AnswerForm extends React.Component {

    state = {
        isSubmitReady: true,
        txtHeight: '50',
        auth: this.props.auth,
        answerTo: `${this.props.parentMsg.user.name}`,
        values: {
            parent_id: this.props.parentMsg.id,
            record_id: this.props.parentMsg.record_id,
            class_name: this.props.parentMsg.class_name,
            msg: ''
        }
    }

    saveComment = () => {

    }

    render() {

        const { values } = this.state
        let addUrl = this.props.addUrl || '/api/comments/add/';

        return(
            <Form
                action={addUrl}
                values={values}
                submitFormAfter={(response, formContext) => {
                    this.setState({
                        isSubmitReady: true
                    })

                    formContext.setFieldValue('msg', '')
                    this.props.fetchComments()

                }}
            >
                <div
                    className={!this.props.isAnswerFormActive ? 'comments__sub-form hide' : 'comments__sub-form'}
                >
                    <div className="comments__form__input-couple__wrap">
                        <label className="comments__form__input-couple__item__label first">
                            <span className="comments__form__listener-fio">{this.state.answerTo}</span>
                        </label>
                        <label>
                            <Field>
                                <Textarea
                                    clear={true}
                                    name="msg"
                                    placeholder="Напишите ваш комментарий"
                                    className="comments__form__input-couple__item"
                                ></Textarea>
                            </Field>
                        </label>

                    </div>


                    <div className="comments__form__button-panel">

                        <div className="comments__form__button-panel__buttons">
                            <Field>
                                <Button
                                    type="submit"
                                    disabled={this.state.isSubmitReady ? false : true}
                                    className="comments__form__button-panel__button send"
                                    onClick={(e) => {
                                        this.setState({
                                            isSubmitReady: false
                                        })
                                    }}
                                >
                                    Отправить
                                </Button>
                            </Field>
                            <Field>
                                <Button
                                    type="button"
                                    disabled={this.state.isSubmitReady ? false : true}
                                    className="comments__form__button-panel__button cancel"
                                    onClick={(e) => {
                                        this.setState({
                                            isSubmitReady: false
                                        })
                                    }}
                                >
                                    Отменить
                                </Button>
                            </Field>

                        </div>

                    </div>
                </div>
            </Form>
        )
    }
}

export default AnswerForm


