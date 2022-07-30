import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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

  const { isAuth, dictsRequired } = useSelector(state => state.auth);

  const { dicts, components } = useSelector(state => state.dicts);

  const isDictsLoaded = components.auth ? true : false;

  useEffect(() => {
    authCheck();
    dispatch(requestDicts(dictsRequired, 'auth'));
  }, []);

  if(isAuth) {
    return React.createElement(LayoutContainer);
  }

  const authCheck = () => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      dispatch(authCheckSuccess(access_token));
    }
  }

  const login: Function = (data) => {

    dispatch(loginRequest());

    Api.post(LOGIN_API_URL, {
      body: data
    }).then(resp => {
      const parsedData = setToken(resp.data.jwtToken);
      const {
        data,
        access_token
      } = parsedData;

      dispatch(loginSuccess(data, access_token));
    });
  }

  const setToken = (tokens) => {

    let data = {}
    let access_token = null

    if (typeof tokens.access_token !== "undefined") {
      access_token = tokens.access_token;
      data = parseJwt(tokens.access_token);
    }

    return {
      access_token,
      data,
    };
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('porabote_user', JSON.stringify(data));
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