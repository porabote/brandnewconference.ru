import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import { requestDicts } from "../dicts/store/dicts-actions";
import Api from "@services";
import View from "./view";
import ViewPreloader from "../view/view-preloader";
import EditUserForm from "./edit-user-form";
import EditForeignPassportForm from "./edit-foreign-passport-form";
import EditPassportForm from "./edit-passport-form";

const ViewContainer = (props) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.users);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.users ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [isCanViewTabs, setIsCanViewTabs] = useState(false);
  const [isItOwn, setIsItOwn] = useState(false);

  useEffect(() => {
    document.title = `Пользователи`;
    dispatch(requestDicts(dictsRequired, 'users'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.users);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/api-users/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setIsItOwn((resp.data.id == user.id) ? true : false);
      checkEditAccess();
    });
  }

  const checkEditAccess = () => {
    Api.get(`/api/api-users/method/checkEditAccess/`)
      .then((resp) => {
        setIsCanEdit(resp.data.isCanEdit);
        setIsCanViewTabs(resp.data.isCanViewTabs);
        setLoaded(true);
      });
  }

  const editUser = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditUserForm, { data, editUserConfirm, dicts, isItOwn, isCanEdit, getRecord }),
      `Редактировать данные пользователя`
    ));
  }

  const editUserConfirm = (values, modalKey, getRecord) => {
    Api.post(`/api/users/method/edit/`, {
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
    Api.get(`/api/users/method/sendInvitationNotification/${request_id}`)
      .then((resp) => {
        dispatch(openConfirm('Приглашение отправлено.'));
      });
  }

  const getPassport = (callback) => {
    Api.get(`/api/passports/method/getByUser/${props.id}`)
      .then((resp) => {
        if (typeof resp.error != "undefined") {
          return dispatch(openConfirm(resp.error));
        }
        callback(resp.data);
      });
  }

  const editPassport = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditPassportForm, {
        data,
        editUserConfirm,
        dicts,
        isItOwn,
        isCanEdit,
        getRecord,
        getPassport,
        editPassportSubmit,
      }),
      `Редактирование паспортных данных`
    ));
  }

  const editForeignPassport = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditForeignPassportForm, {
        data,
        editUserConfirm,
        dicts,
        isItOwn,
        isCanEdit,
        getRecord,
        getForeignPassport,
        editPassportSubmit,
      }),
      `Редактирование данных заграничного паспорта`
    ));
  }

  const getForeignPassport = (callback) => {
    Api.get(`/api/passports/method/getForeignByUser/${props.id}`)
      .then((resp) => {
        if (typeof resp.error != "undefined") {
          return dispatch(openConfirm(resp.error));
        }
        callback(resp.data);
      });
  }

  const editPassportSubmit = (values, modalKey) => {
    Api.post(`/api/passports/method/edit/`, {
      body: values
    }).then((resp) => {
      if( typeof resp.error != "undefined") {
        return dispatch(openConfirm(resp.error));
      }
      dispatch(removeModalItem(modalKey));
    });
  }

  const attachShiftWorker = (shiftworkerId, userId) => {
    Api.get(`/api/api-users/method/attachShiftWorker/`, {
      query: {
        user_id: userId,
        shiftworker_id: shiftworkerId,
      }
    }).then((resp) => {
      //dispatch(removeModalItem(modalKey));
      getRecord();
    });
  }

  const detachShiftWorker = (shiftworkerId, userId) => {
    Api.get(`/api/api-users/method/detachShiftWorker/`, {
      query: {
        user_id: userId,
        shiftworker_id: shiftworkerId,
      }
    }).then((resp) => {
      getRecord();
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
      isCanEdit={isCanEdit}
      isCanViewTabs={isCanViewTabs}
      editUser={editUser}
      editUserConfirm={editUserConfirm}
      isItOwn={isItOwn}
      sendInvitationNotification={sendInvitationNotification}
      editPassport={editPassport}
      editForeignPassport={editForeignPassport}
      attachShiftWorker={attachShiftWorker}
      detachShiftWorker={detachShiftWorker}
    />
  );

}

export default ViewContainer;