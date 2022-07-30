import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useRouteMatch,} from "react-router-dom";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import Api from "@services/api-client";
import ViewContainer from "./view-container";
import Feed from "./feed";

const MainContainer = (props) => {

  const dispatch = useDispatch();

  return React.createElement(Feed, {
    // isDictsLoaded,
    // fetchData,
    // updateFilters,
    // dicts,
  });
}

export default MainContainer;