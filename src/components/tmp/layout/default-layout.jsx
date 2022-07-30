import React from 'react';
import AppRouter from '@components/app-router';
import Modal from 'porabote/modal';
import Confirm from "porabote/confirm";
import Styles from "../styles/styles";

const DefaultLayout = () => {

  return (
    <div className="main">

      <div className="header">

      </div>

      <section className="main-section">
        <AppRouter/>
      </section>

      <Modal/>
      <Confirm/>

    </div>
  )
}

export default DefaultLayout;