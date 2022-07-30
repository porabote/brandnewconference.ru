import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { pushItemToModal, removeModalItem } from "porabote/modal/store/modal-actions";
import { requestDicts } from "../dicts/store/dicts-actions";
import Api from "@services/api-service";
import AcceptListBuilding from "./accept-lists-building.jsx";
import AcceptListSigning from "./accept-lists-signing.jsx";
import AddStep from "./add-step.jsx";
import DeclineStepForm from "./decline-step-form";
import ChangeAcceptorForm from "./change-acceptor-form";

const AcceptListsContainer = (props) => {

  const dispatch = useDispatch();

  const [steps, setSteps] = useState([]);
  const [mode, setMode] = useState('building');
  const [isCanChangeAcceptor, setIsCanChangeAcceptor] = useState(false);
  const [isStepsLoaded, setIsStepsLoaded] = useState(false);

  const { dictsRequired } = useSelector(state => state.acceptLists);
  const { dicts, components } = useSelector(state => state.dicts);

  const isDictsLoaded = components.acceptLists ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'acceptLists'));
    getSteps();
  }, []);

  const {
    foreignKey,
    model,
  } = props;

  const getSteps = () => {
    setIsStepsLoaded(false);
    Api.get(`/api/accept-lists/method/getSteps/?foreignKey=${foreignKey}&model=${model}`)
      .then((resp) => {
        getMode(resp.data);
      });
  }

  const getMode = (steps) => {
    Api.get(`/api/${model}/method/getAcceptListMode/?foreignKey=${foreignKey}&model=${model}`)
      .then((resp) => {
        setMode(resp.data.mode);
        setIsCanChangeAcceptor(resp.data.isCanChangeAcceptor);
        setSteps(steps);
        setIsStepsLoaded(true);
      });
  }

  // Сохранение листа
  const setAcceptors = (values) => {

    Api.post(`/api/accept-lists/method/setAcceptors/?foreignKey=${foreignKey}&model=${model}`, {
      body: values,
    })
      .then((resp) => {
        getSteps();
        setAcceptorsCallback();
      });
  }

  const setAcceptorsCallback = () => {
    Api.get(`${props.eventsCallbackUrl}?action=setAcceptors&foreignKey=${foreignKey}`)
      .then((resp) => {
        autoloadAll();
      });
  }

  const addStep = () => {
    dispatch(pushItemToModal(React.createElement(AddStep, {
      foreignKey:  props.foreignKey,
      getSteps,
      steps,
      addStepSave,
    }), 'Добавление шага'));
  }

  const addStepSave = (values) => {
    Api.post(`/api/accept-lists/method/addStep/?foreignKey=${foreignKey}&model=${model}`, { body: values, })
      .then((resp) => {
        getSteps();
      });
  }

  const deleteStep = (stepId) => {
    Api.get(`/api/accept-lists/method/deleteStep/?stepId=${stepId}`)
      .then((resp) => {
        getSteps();
      });
  }

  const acceptStep = (stepId) => {
    Api.get(`/api/accept-lists/method/acceptStep/?stepId=${stepId}`)
      .then((resp) => {
        acceptStepCallback();
      });
  }

  const acceptStepCallback = () => {
    Api.get(`${props.eventsCallbackUrl}?action=acceptStep&foreignKey=${foreignKey}`)
      .then((resp) => {
        getSteps();
        autoloadAll();
      });
  }

  const declineStep = (stepId) => {
    dispatch(pushItemToModal(
      React.createElement(DeclineStepForm, { stepId, declineStepAfterConfirm }),
      'Отклонение подписи шага'
    ));
  }

  const declineStepAfterConfirm = (values, modalKey) => {
    Api.get(`/api/accept-lists/method/declineStep/?stepId=${values['stepId']}`)
      .then((resp) => {
        declineStepCallback(values);
        dispatch(removeModalItem(modalKey));
      });
  }

  const declineStepCallback = (values) => {
    Api.post(`${props.eventsCallbackUrl}?action=declineStep&foreignKey=${foreignKey}`, { body: values })
      .then((resp) => {
        getSteps();
        autoloadAll();
      });
  }

  const changeAcceptor = (step) => {
    dispatch(pushItemToModal(React.createElement(ChangeAcceptorForm, {
      step,
      changeAcceptorAfterConfirm,
    }), 'Добавление шага'));
  }

  const changeAcceptorAfterConfirm = (values, modalKey, oldStep) => {
    Api.post(`/api/accept-lists/method/changeAcceptor/?stepId=${values.step.id}`, { body: values})
      .then((resp) => {
        changeAcceptorCallback(values, oldStep, resp.data);
        dispatch(removeModalItem(modalKey));
      });
  }

  const changeAcceptorCallback = (values, oldStep, newStep) => {
    Api.post(`${props.eventsCallbackUrl}?action=changeAcceptor&foreignKey=${foreignKey}`, { body: {oldStep, newStep, ...values} })
      .then((resp) => {
        getSteps();
        autoloadAll();
      });
  }


  const autoloadAll = () => {
    if (typeof onApp != "undefined") {
      onApp.autoloadAll();
    }
  }

  if (!isDictsLoaded) {
    return('Справочники загружаются');
  }

  if (mode == "building") {
    return React.createElement(AcceptListBuilding, {
      getSteps,
      setAcceptors,
      addStep,
      addStepSave,
      deleteStep,
      isDictsLoaded,
      steps,
      isStepsLoaded,
    });
  } else {
    return React.createElement(AcceptListSigning, {
      getSteps,
      isDictsLoaded,
      steps,
      isStepsLoaded,
      acceptStep,
      declineStep,
      changeAcceptor,
      isCanChangeAcceptor,
    });
  }

}

export default AcceptListsContainer;