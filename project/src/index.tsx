import React from 'react';
import ReactDOM from 'react-dom/client';

import {FILM_DATA, PROMO} from './mocks/films';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      filmData={FILM_DATA}
      promoFilm={PROMO}
    />
  </React.StrictMode>,
);
