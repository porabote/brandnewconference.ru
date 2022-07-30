import React from 'react'
import ObserversAddForm from './observers-add-form'
import { connect } from 'react-redux'

class ContentPanel extends React.Component {

    render() {

        return(
            <React.Fragment>

                <div>
                    <span
                        onClick={() => {
                            this.props.pushModalItem(this.props.dicts, this.props.fetchData);
                        }}
                        className="button-drop"
                                >
                        Добавить
                    </span>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pushModalItem: (dicts, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: 'Создать отчет',
                content: React.createElement(ObserversAddForm, {dicts, fetchData})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(ContentPanel)