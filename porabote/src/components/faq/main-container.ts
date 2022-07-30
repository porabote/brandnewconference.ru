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


interface IChildComponentProps extends React.Props<any> {
   fetchFeedData: Function,
   filters: Object,
}

const FaqContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.faq);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.faq ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'faq'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values, modalKey) => {
    Api.post(`/api/faq/method/create/`,{
      body: values,
    })
    .then((resp) => {
      dispatch(removeModalItem(modalKey));
      history.push(`/faq/view/${resp.data.id}`);
    });
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
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

export default FaqContainer;