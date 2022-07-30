import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Api from "@services/api-client";
import { requestDicts } from "../dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "@components/spares/store/spares-actions";
import View from "./view";
import Feed from "./feed";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const SparesContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.spares);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.spares ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'spares'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }


  if (props.match.params.action === "view") {
    return React.createElement(View);
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters
  });

}

export default SparesContainer;