import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import { pushItemToModal, removeModalItem } from "porabote/modal/store/modal-actions";
import Api from "@services/api-service";
import { requestDicts } from "../dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "./store/actions";
import View from "./view";
import Feed from "./feed";
import Add from "./add";
import Edit from "./edit";
import AttachUsersForm from "./attach-users-form";
import { openConfirm } from "porabote/confirm/store/confirm-actions";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const ShiftsContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.shifts);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.shifts ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'shifts'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }
  
  const add = (values) => {
    dispatch(pushItemToModal(React.createElement(Add, { dicts, addConfirm }),`Добавление вахты`));
  }

  const addConfirm = (values, modalKey) => {
    Api.post(`/api/shifts/method/create/`, {
      body: values,
    })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        dispatch(updateFeedFilters());
        fetchData();
      });
  }

  const edit = (values) => {
    dispatch(pushItemToModal(React.createElement(Edit, { dicts, editConfirm, values }),`Редактирование вахты вахты`));
  }

  const editConfirm = (values, modalKey) => {
    Api.post(`/api/shifts/method/edit/`, {
      body: values,
    })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        dispatch(updateFeedFilters());
        fetchData();
      });
  }

  const attachUser = (fetchData) => {
    dispatch(pushItemToModal(React.createElement(
      AttachUsersForm, { dicts, id: props.match.params.id, attachUserConfirm, fetchData }),
      `Добавление вахты`
    ));
  }

  const attachUserConfirm = (values, modalKey, fetchData) => {

    Api.post(`/api/shifts/method/attachUsers/`, {
      body: values,
    })
      .then((resp) => {
        fetchData();
        dispatch(removeModalItem(modalKey));
      });
  }

  const detachUser = (userId, fetchData) => {

    Api.get(`/api/shifts/method/detachUser/${userId}`)
      .then((resp) => {
        fetchData();
      });
  }

  const savePeriods = (id, periods, callback) => {

    Api.post(`/api/shifts/method/savePeriods/`, {
      body: {id, periods},
    })
      .then((resp) => {
        dispatch(openConfirm('Данные обновлены.'));
        callback([...periods]);
      });
  }

  if (props.match.params.action === "view") {
    return React.createElement(View, {
      id: props.match.params.id,
      dataSource: `/api/shifts/get/${props.match.params.id}`,
      storeAlias: 'shifts',
      isDictsLoaded,
      attachUser,
      detachUser,
      savePeriods,
      edit,
    });
  };

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    add,
  });

}

export default ShiftsContainer;