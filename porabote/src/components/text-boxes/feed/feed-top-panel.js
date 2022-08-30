import React from 'react';
import AddForm from '../forms/add-form';
import {useDispatch} from 'react-redux';
import {pushItemToModal} from "porabote/modal";

const FeedTopPanel = props => {

  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(pushItemToModal(
      <AddForm fetchData={props.fetchData} dicts={props.dicts} addRecord={props.addRecord} />,
      `Добавление`,
    ));
  }

  return (
    <React.Fragment>

      <div>
        <span onClick={openAddModal} className="button-drop">
            Добавить
        </span>
      </div>
    </React.Fragment>
  );
}

export default FeedTopPanel;