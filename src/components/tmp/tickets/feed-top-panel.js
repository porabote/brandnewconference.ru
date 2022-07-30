import React from 'react';
import EquipmentsAddForm from './add-form'
import {connect} from 'react-redux'

class FeedTopPanel extends React.Component {

  render() {

    return (
      <React.Fragment>

        <div>
            <span
              onClick={() => {
                this.props.pushModalItem(
                  this.props.fetchData,
                  `Добавить заявку`,
                  this.props.createTicketRequest,
                );
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
    pushModalItem: (fetchData, title, createTicketRequest) => dispatch({
      type: 'PUSH_MODAL_ITEM',
      payload: {
        title,
        content: React.createElement(EquipmentsAddForm, {fetchData, createTicketRequest})
      }
    }),
  }
}
export default connect(null, mapDispatchToProps)(FeedTopPanel);