import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useRouteMatch,} from "react-router-dom";
import Api from "@services/api-client";
import { requestDicts } from "../dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "@components/users/store/users-actions";
import ViewContainer from "./view-container";
import ConfirmInvitation from "./confirm-invitation";
import Feed from "./feed";
import Contacts from "./contacts.js"

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const UsersContainer = (props: IChildComponentProps) => {
 
  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.users);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.users ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'users'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  if (props.match.params.action === "contacts") {
    return React.createElement(Contacts, {
      isDictsLoaded,
      fetchData,
      updateFilters,
      dicts,
    });
  } else if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id
    });
  } else if (props.match.params.action === "confirmInvitation") {
    let uri = window.location.search;
    var searchParams = new URLSearchParams(uri);
    return React.createElement(ConfirmInvitation, {
      token: searchParams.get('token'),
      requestId: searchParams.get('requestId')
    });
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    dicts,
  });

}

export default UsersContainer;