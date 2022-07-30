import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import Api from "@services";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {fetchFeedData, updateFeedFilters} from "./store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";


interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const MenusContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.menus);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.menus ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'menus'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values) => {
    Api.post(`/api/menus/method/create/`,{
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

export default MenusContainer;