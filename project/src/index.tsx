import { checkAuthAction, fetchFilmsAction, fetchPromoAction } from './store/api-actions';

import App from './components/app/app';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
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
      <App />
    </Provider>
  </React.StrictMode>,
);
