import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { useHistory } from 'react-router';
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import { requestDicts } from "@components/dicts/store/dicts-actions";
import Api from "@services";
import View from "./view";
import ViewPreloader from "@components/view/view-preloader";
import EditRecordForm from "../forms/edit-form";

const ViewContainer = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.mailsPatterns);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.mailsPatterns ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [isCanViewTabs, setIsCanViewTabs] = useState(false);
  const [isItOwn, setIsItOwn] = useState(false);

  useEffect(() => {
    document.title = title;
    dispatch(requestDicts(dictsRequired, 'mailsPatterns'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.mailsPatterns);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/mails-patterns/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setLoaded(true);
    });
  }

  const editRecord = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditRecordForm, { data, editRecordConfirm, dicts, getRecord }),
      `Редактировать данные`
    ));
  }

  const deleteRecord = (id, fetchFeedData) => {
    Api.get(`/api/mails-patterns/method/delete/?id=${id}`)
      .then((resp) => {
        fetchFeedData();
        history.push('/mails-patterns/feed/');
    });
  }

  const editRecordConfirm = (values, modalKey, getRecord) => {
    Api.post(`/api/mails-patterns/method/edit/`, {
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
      deleteRecord={deleteRecord}
      fetchFeedData={props.fetchFeedData}
    />
  );

}

export default ViewContainer;