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
  // return React.createElement(ConfirmInvitation, {
  //   token: searchParams.get('token'),
  //   requestId: searchParams.get('requestId')
  // });

  return(
    <div className="main">

      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <ConfirmInvitation token={searchParams.get('token')} requestId={searchParams.get('requestId')}></ConfirmInvitation>
        {/*<AppRouter/>*/}
      </section>

      <Modal/>
      <Confirm/>

    </div>
  );
}

export default LoginLayout;