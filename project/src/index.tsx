import 'react-toastify/dist/ReactToastify.css';

import {
  checkAuthAction,
  fetchFilmsAction,
  fetchPromoAction
} from './store/api-actions';

import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import browserHistory from './services/browser-history';
import { store } from './store/index';

store.dispatch(fetchPromoAction());
store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
