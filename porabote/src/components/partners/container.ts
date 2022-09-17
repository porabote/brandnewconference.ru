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
import SortList from "./feed/sort-list";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const PartnersContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.partners);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.partners ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'partners'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values) => {
    Api.post(`/api/partners/method/create/`,{
      body: values,
    })
      .then((resp) => {
        dispatch(removeModalItem(0));
        history.push(`/partners/view/${resp.data.id}`);
      });
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
    });
  }

  if (props.match.params.action === "sort-list") {
    return React.createElement(SortList, {
      isDictsLoaded,
      fetchData,
      updateFilters,
      dicts,
      addRecord,
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

export default PartnersContainer;