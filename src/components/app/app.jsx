import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import LayoutContainer from "@components/layout";

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <LayoutContainer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;