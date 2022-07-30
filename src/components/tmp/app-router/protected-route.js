import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import {LOGIN_ACTION} from "@components/auth/constants"

const ProtectedRoute = ({component: Component, authAllow: authAllow, ...rest}) => {

  const {isAuth} = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props => {
        //console.log(isAuth)
        authAllow = authAllow || [];
        var isMethodAllowed = false;
        for (var i = 0; i < authAllow.length; i++) {
          if (authAllow[i] == props.match.params.action) {
            isMethodAllowed = true;
            break;
          }
        }
//console.log(isAuth)
        if (isAuth || isMethodAllowed) {
          return <Component {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: LOGIN_ACTION,
              state: {
                reference: props.location
              }
            }
              }
            />
          }
      }
      }/>
  );

};

export default ProtectedRoute;