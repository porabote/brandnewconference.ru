import React from 'react';
import AppRouter from '@components/app-router';
import Modal from '@components/common/modal';
import Confirm from "porabote/confirm";

const DefaultLayout = () => {

  return (
    <div>
      <section className="main-section">
        <AppRouter/>
      </section>
      <Modal/>
      <Confirm/>
    </div>
  )
}

export default DefaultLayout;