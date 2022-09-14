import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import { requestDicts } from "@components/dicts/store/dicts-actions";
import Api from "@services";
import View from "./view";
import ViewPreloader from "@components/view/view-preloader";
import EditForm from "../forms/edit-form";
import AddVariant from "../forms/add-variant";

const ViewContainer = (props) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.questionnaires);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.questionnaires ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [isCanViewTabs, setIsCanViewTabs] = useState(false);
  const [isItOwn, setIsItOwn] = useState(false);

  useEffect(() => {
    document.title = title;
    dispatch(requestDicts(dictsRequired, 'questionnaires'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.questionnaires);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/questionnaires/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setIsItOwn((resp.data.id == user.id) ? true : false);
      setLoaded(true);
     // checkEditAccess();
    });
  }

  const addVariant = () => {
    dispatch(pushItemToModal(
      React.createElement(AddVariant, {
        data,
        dicts,
        callback: (modalKey) => {
          dispatch(removeModalItem(modalKey));
          getRecord();
        },
      }),
      `Добавить вариант`
    ));
  }

  const editRecord = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditForm, { data, editRecordConfirm, dicts, isItOwn, isCanEdit, getRecord }),
      `Редактировать данные пользователя`
    ));
  }

  const editRecordConfirm = (values, modalKey, getRecord) => {
    Api.post(`/api/questionnaires/method/edit/`, {
      body: values
    }).then((resp) => {
      if( typeof resp.error != "undefined") {
        return dispatch(openConfirm(resp.error));
      }
      getRecord();
      dispatch(removeModalItem(modalKey));
    });
  }

  if (!loaded || !isDictsLoaded) {
    return <ViewPreloader/>;
  }

  return (
    <View
      dicts={dicts}
      data={data}
      getRecord={getRecord}
      editRecord={editRecord}
      editRecordConfirm={editRecordConfirm}
      addVariant={addVariant}
    />
  );

}

export default ViewContainer;