import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import FilmPromo from './film-promo';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: FilmPromo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const promoFake = makeFakeFilm();
    render(
      <Provider store={
        mockStore({
          FILM: {
            favouriteFilmList: new Array(3),
            promo: promoFake,
            isLoadingCompleted: {promo: true},
          },
          USER: { authStatus: AuthStatus.Auth },
        })
      }
      >
        <HistoryRouter history={history}>
          <FilmPromo />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(promoFake.title)).toBeInTheDocument();
  });
});
