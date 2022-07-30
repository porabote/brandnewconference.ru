import React from "react";
import AppRouter from '@components/app-router';
import AuthLogin from "@components/auth/auth-login";
import Modal from 'porabote/modal';
import Confirm from "porabote/confirm";
import Header from '@components/header';
import Styles from "../styles/styles";
import ConfirmInvitation from "@components/users/confirm-invitation";

const LoginLayout = (props) => {

  let uri = window.location.search;
  var searchParams = new URLSearchParams(uri);
console.log(props)
  return(
    <div className="main">

      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <AppRouter {...props}/>
        {/*<AuthLogin login={props.login}/>*/}
      </section>

      <Modal/>
      <Confirm/>

    </div>
  );
}

export default LoginLayout;