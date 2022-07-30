import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {openConfirm} from "porabote/confirm"
import Api from "@services";
import {
  authCheck,
  authCheckSuccess,
  loginRequest,
  loginSuccess,
} from "./store/auth-actions";
import { requestDicts } from "../dicts/store/dicts-actions";
import LayoutContainer, { LoginLayout } from "@components/layout";
import { LOGIN_API_URL } from "./constants";

const AuthContainer = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, dictsRequired } = useSelector(state => state.auth);

  const { dicts, components } = useSelector(state => state.dicts);

  const isDictsLoaded = true;//components.auth ? true : false;

  const authCheck = () => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      dispatch(authCheckSuccess(access_token));
    }
  }

  useEffect(() => {
    authCheck();
    //dispatch(requestDicts(dictsRequired, 'auth'));
  }, []);

  if(isAuth) {
    return React.createElement(LayoutContainer);
  }


  const login: Function = (data) => {

    dispatch(loginRequest());

    Api.post(LOGIN_API_URL, {
      body: data
    }).then(resp => {
      
      if (typeof resp.error != "undefined") {
        dispatch(openConfirm(resp.error));
        return;
      }

      const parsedData = setToken(resp.data.jwtToken);

      const {
        data,
        access_token
      } = parsedData;

      dispatch(loginSuccess(data, access_token));
      history.push(`/pages/main/`);
    });
  }

  const setToken = (tokens) => {

    let data = {}
    let access_token = null

    if (typeof tokens.access_token !== "undefined") {
      access_token = tokens.access_token;
      data = parseJwt(tokens.access_token);
    }

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('porabote_user', JSON.stringify(data));

    return {
      access_token,
      data,
    };
  }

  const parseJwt = token => {
    var base64Url = token.split('.')[1];

    if (base64Url === undefined) return null;

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  return React.createElement(LoginLayout, {
    isDictsLoaded,
    dicts,
    login,
  });

}

export default AuthContainer;