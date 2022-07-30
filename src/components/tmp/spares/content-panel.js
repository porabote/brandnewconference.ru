import React from 'react'
import SparesAddForm from './spares-add-form'
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
                title: 'Добавить запчасть',
                content: React.createElement(SparesAddForm, {dicts, fetchData})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(ContentPanel)