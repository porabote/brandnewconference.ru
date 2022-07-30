import React from 'react';
import { Button } from 'porabote/form';
import PaymentsSetsAddForm from './payments-sets-add-form';
import ShneiderFeedback from './shneider-updater';
import { connect } from 'react-redux';

class ContentPanel extends React.Component {

    render() {

        return(
            <div style={{width: '340px', marginBottom: '10px'}}>

                <Button
                    text="Обновить информацию от ShneiderGroup"
                    className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                    type="button"
                    onClick={() => {
                        this.props.modalPaymentsUpdateStatuses();
                    }}

                />

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalPaymentsUpdateStatuses: () => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: `Запрос статуса платежей от ShneiderGroup`,
                content: React.createElement(ShneiderFeedback, {})
            }
        }),
        pushModalItem: (dicts, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: 'Создать отчет',
                content: React.createElement(PaymentsSetsAddForm, {dicts, fetchData})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(ContentPanel)