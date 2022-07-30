import React from 'react';
import EquipmentsAddForm from './equipments-add-form'
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
                  `Добавить оборудование`,
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
    pushModalItem: (fetchData, title) => dispatch({
      type: 'PUSH_MODAL_ITEM',
      payload: {
        title,
        content: React.createElement(EquipmentsAddForm, {fetchData})
      }
    }),
  }
}
export default connect(null, mapDispatchToProps)(FeedTopPanel);