import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Api from "@services/api-service";
import {openConfirm} from "porabote/confirm";
import {API_URL} from "@configs"
import { requestDicts } from "../dicts/store/dicts-actions";
import { pushItemToModal, removeModalItem } from "porabote/modal/store/modal-actions";
import { fetchFeedData, updateFeedFilters } from "@components/tickets/store/tickets-actions";
import View from "./view";
import Feed from "./feed";
import { useHistory } from 'react-router';
import AddTicketsUsers from "./add-tickets-users";
import EditTicket from "./edit-ticket";
import EditTicketRequest from "./edit-ticket-request";

const TicketsContainer = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.tickets);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.tickets ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'tickets'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const createTicketRequest = (values, modalKey) => {
    Api.post(`/api/ticketsRequests/method/create/`,{ body: values })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        history.push(`/tickets/view/${resp.data.id}`);
      });
  }

  const getTickets = (callback) => {
    Api.get(`/api/tickets/get/`, {
      query: {
        where: {
          ticket_request_id: props.match.params.id,
        },
        include: [
          "city_from",
          "city_to",
          "comments",
          "files",
          "history",
          "user.passport",
          "user.passport_foreign",
          "status",
        ]
      }
    })
      .then((resp) => {
        callback(resp.data);
      });
  }

  const addTickets = (requestId, setTickets) => {
    dispatch(pushItemToModal(
      React.createElement(AddTicketsUsers, { requestId, dicts, addTicketsSubmit, setTickets }),
      'Добавить билет',
    ));
  }

  const addTicketsSubmit = (request_id, users, modalKey, setTickets) => {
    Api.post(`/api/tickets/method/addTickets`, {
      body: {users, request_id}
    })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        getTickets(setTickets);
      });
  }

  const downloadTicketsList = (request_id) => {
    console.log(request_id);
    window.location = `${API_URL}/api/ticketsRequests/method/downloadTickets?request_id=${request_id}`;
  }
  
  const editTicket = (id, data, setTickets) => {
    dispatch(pushItemToModal(
      React.createElement(EditTicket, { id, dicts, editTicketSubmit, data, setTickets}),
      'Редактировать билет',
    ));
  }

  const editTicketSubmit = (values, modalKey, setTickets) => {
    Api.post(`/api/tickets/method/edit`, {
      body: {...values}
    })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        getTickets(setTickets);
        fetchData();
      });
  }

  const editTicketsRequest = (id, data, fetchData) => {
    dispatch(pushItemToModal(
      React.createElement(EditTicketRequest, { id, dicts, editTicketsRequestSubmit, data, fetchData }),
      'Редактировать запрос',
    ));
  }

  const editTicketsRequestSubmit = (values, modalKey, fetchData) => {
    Api.post(`/api/tickets-requests/method/edit`, {
      body: {...values}
    })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        fetchData();
      });
  }

  const deleteTicket = (id, setTickets) => {
    dispatch(openConfirm('Удалить билет', deleteTicketConfirm, {id, setTickets} ));
  }

  const deleteTicketConfirm = (props) => {
    Api.get(`/api/tickets/method/delete?id=${props.id}`)
      .then((resp) => {
        getTickets(props.setTickets);
      });
  }


  

  if (props.match.params.action === "view") {
    return React.createElement(View, {
      dataSource: `/api/ticketsRequests/get/${props.match.params.id}`,
      storeAlias: 'tickets',
      getTickets,
      addTickets,
      addTicketsSubmit,
      downloadTicketsList,
      editTicket,
      deleteTicket,
      editTicketsRequest,
    });
  }
  
  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    createTicketRequest,
    dicts,
  });
}

export default TicketsContainer;