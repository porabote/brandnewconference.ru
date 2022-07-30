import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import AuthContainer from '@components/auth';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter basename="/porabote" history={history}>
        <AuthContainer/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;