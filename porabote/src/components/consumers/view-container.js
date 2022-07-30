import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import { requestDicts } from "../dicts/store/dicts-actions";
import Api from "@services";
import View from "./view";
import ViewPreloader from "../view/view-preloader";

const ViewContainer = (props) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.consumers);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.consumers ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [isCanViewTabs, setIsCanViewTabs] = useState(false);
  const [isItOwn, setIsItOwn] = useState(false);

  useEffect(() => {
    document.title = title;
    dispatch(requestDicts(dictsRequired, 'consumers'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.consumers);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/consumers/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setLoaded(true);
      //setIsItOwn((resp.data.id == user.id) ? true : false);
     // checkEditAccess();
    });
  }

  // const checkEditAccess = () => {
  //   Api.get(`/api/consumers/method/checkEditAccess/`)
  //     .then((resp) => {
  //       setIsCanEdit(resp.data.isCanEdit);
  //       setIsCanViewTabs(resp.data.isCanViewTabs);
  //       setLoaded(true);
  //     });
  // }

  const editUser = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditUserForm, { data, editUserConfirm, dicts, isItOwn, isCanEdit, getRecord }),
      `Редактировать данные пользователя`
    ));
  }

  const editUserConfirm = (values, modalKey, getRecord) => {
    Api.post(`/api/consumers/method/edit/`, {
      body: values
    }).then((resp) => {
      if( typeof resp.error != "undefined") {
        return dispatch(openConfirm(resp.error));
      }
      getRecord();
      dispatch(removeModalItem(modalKey));
    });
  }

  const sendInvitationNotification = (request_id) => {
    Api.get(`/api/consumers/method/sendInvitationNotification/${request_id}`)
      .then((resp) => {
        dispatch(openConfirm('Приглашение отправлено.'));
      });
  }

  const acceptPart = (id, getRecord) => {
    Api.get(`/api/consumers/method/acceptPart/?id=${id}`)
      .then((resp) => {
        getRecord();
        dispatch(openConfirm("Заявка подтверждена"));
    });
  }


  const declinePart = (id, getRecord) => {
    Api.get(`/api/consumers/method/declinePart/?id=${id}`)
      .then((resp) => {
        getRecord();
        dispatch(openConfirm("Заявка отклонена"));
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
      editUser={editUser}
      editUserConfirm={editUserConfirm}
      acceptPart={acceptPart}
      declinePart={declinePart}
    />
  );

}

export default ViewContainer;