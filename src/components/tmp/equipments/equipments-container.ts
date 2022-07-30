import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from "@services/constants";
import Api from "@services/api-client";
import { requestDicts } from "../dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "@components/equipments/store/equipments-actions";
import View from "./view";
import Feed from "./feed";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const EquipmentsContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.equipments);
  const { dicts, components } = useSelector(state => state.dicts);

  const isDictsLoaded = components.equipments ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'equipments'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const exportFeedToExcel: Function = (data) => {

    let ids = '';
    data.map(item => {
      ids = `${ids}|${item.id}`;
    });
    ids = ids.replace(/^\|+|\|+$/g, '');

    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";
    mapForm.action = `${API_URL}/api/equipments/method/exportFeedToExcel/`;

    var mapInput = document.createElement("input");
    mapInput.type = "text";
    mapInput.name = "ids";
    mapInput.value = ids;
    mapForm.appendChild(mapInput);

    document.body.appendChild(mapForm);
    mapForm.submit();
    mapForm.remove();
  }

  if (props.match.params.action === "view") {
    return React.createElement(View);
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    exportFeedToExcel
  });
  
}

export default EquipmentsContainer;