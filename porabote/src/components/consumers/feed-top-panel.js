import React from 'react'
import {connect} from 'react-redux'

const FeedTopPanel = (props) => {
  
  return (
    <React.Fragment>

      <div>
            <span
              onClick={() => {
                props.pushModalItem(
                  props.dicts,
                  props.fetchData,
                  `Пригласить пользователя`,
                );
              }}
              className="button-drop"
            >
                Добавить
            </span>
      </div>
    </React.Fragment>
  );

}

export default FeedTopPanel;