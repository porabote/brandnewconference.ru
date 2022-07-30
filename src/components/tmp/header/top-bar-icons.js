import React from "react";
import {NavLink} from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import {useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import {Contacts} from "../users"

const TopBarIcons = () => {

  const dispatch = useDispatch();

  const openContacts = () => {
    dispatch(pushItemToModal(
      React.createElement(Contacts, {}),
      `Контакты сотрудников`
    ));
  }

  return (
    <div className="header-panel__top-bar-icons">
      <NavLink to="/users/contacts/">
        <GroupIcon className="header-panel__top-bar-icons__contacts"/>
      </NavLink>
    </div>
  );
}

export default TopBarIcons;