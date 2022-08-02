import App from './components/app/app';
import {FILM_DATA} from './mocks/films';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmData={FILM_DATA}
        promoFilm={FILM_DATA[FILM_DATA.length - 1]}
      />
    </Provider>
  </React.StrictMode>,
);
