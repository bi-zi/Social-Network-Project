import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { store } from './store/store';
import { extendedApiSlice } from './store/friends/friendsApi';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const el = document.getElementById('root');
if (el === null) throw new Error('Root container missing in index.html');

store.dispatch(extendedApiSlice.endpoints.getAllUsers.initiate());

const root = ReactDOM.createRoot(el);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
