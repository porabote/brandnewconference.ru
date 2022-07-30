import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import Api from "@services/api-client";
import { requestDicts } from "../dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "./store/actions";
import View from "./view";
import Feed from "./feed";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const SamplesContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.samples);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.samples ? true : false;

  useEffect(() => {console.log(dictsRequired);
    dispatch(requestDicts(dictsRequired, 'samples'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  if (props.match.params.action === "view") {
    return React.createElement(View, {
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
    updateFilters
  });

}

export default SamplesContainer;