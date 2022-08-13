import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useRouteMatch,} from "react-router-dom";
import { API_URL } from "@services/constants";
import Api from "@services/api-client";
import { requestDicts } from "@components/dicts/store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "./store/consumers-actions";
import ViewContainer from "./view-container";
import Feed from "./feed";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const ConsumersConrainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.consumers);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.consumers ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'consumers'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const acceptPart = (id) => {
    Api.get(`/api/consumers/method/acceptPart/?id=${id}`)
      .then((resp) => {
        dispatch(openConfirm("Заявка подтверждена"));
      });
  }


  const declinePart = (id) => {
    Api.get(`/api/consumers/method/declinePart/?id=${id}`)
      .then((resp) => {
        dispatch(openConfirm("Заявка отклонена"));
      });
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

  const exportFeedToExcel: Function = (data) => {

    let ids = '';
    // data.map(item => {
    //   ids = `${ids}|${item.id}`;
    // });
    // ids = ids.replace(/^\|+|\|+$/g, '');

    var mapForm = document.createElement("form");
    mapForm.target = "Map";
    mapForm.method = "POST";
    mapForm.action = `${API_URL}/api/consumers/method/exportToExcel/`;

    var mapInput = document.createElement("input");
    mapInput.type = "text";
    mapInput.name = "ids";
    mapInput.value = ids;
    mapForm.appendChild(mapInput);

    document.body.appendChild(mapForm);
    mapForm.submit();
    mapForm.remove();

  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    dicts,
    acceptPart,
    declinePart,
    exportFeedToExcel,
  });

}

export default ConsumersConrainer;