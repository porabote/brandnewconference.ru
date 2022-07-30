import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import { useHistory } from 'react-router';
import Api from "@services";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {fetchFeedData, updateFeedFilters} from "./store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";


interface IChildComponentProps extends React.Props<any> {
   fetchFeedData: Function,
   filters: Object,
}

const SpeakersContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.speakers);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.speakers ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'speakers'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values) => {
    Api.post(`/api/speakers/method/create/`,{
      body: values,
    })
    .then((resp) => {
      //dispatch(removeModalItem(modalKey));
      //history.push(`/tickets/view/${resp.data.id}`);
    });
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
      fetchFeedData: fetchData,
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

export default SpeakersContainer;