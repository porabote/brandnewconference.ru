import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import {useRouteMatch} from "react-router-dom";
import {removeModalItem} from "porabote/modal";
import Api from "@services";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {fetchFeedData, updateFeedFilters} from "./store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";
import WsPanel from "./ws-panel";


interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const QuestionnairesContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.questionnaires);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.questionnaires ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'questionnaires'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values) => {
    Api.post(`/api/questionnaires/method/create/`,{
      body: values,
    })
    .then((resp) => {
      dispatch(removeModalItem(0));
      history.push(`/questionnaires/view/${resp.data.id}`);
    });
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
    });
  }

  if (props.match.params.action === "ws-panel") {
    return React.createElement(WsPanel, {
      fetchData,
    });
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    dicts,
    addRecord,
  });

}

export default QuestionnairesContainer;