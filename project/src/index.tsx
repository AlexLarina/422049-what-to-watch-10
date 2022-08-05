import App from './components/app/app';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { fetchFilmsAction } from './store/api-actions';
import { store } from './store/index';

store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
