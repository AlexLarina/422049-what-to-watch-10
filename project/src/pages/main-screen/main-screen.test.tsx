import { AuthStatus, FILM_MOCK_AMOUNT, Genre } from '../../const';
import { makeFakeFilm, makeFakeUser } from '../../test/mocks';
import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const films = new Array(FILM_MOCK_AMOUNT).fill(makeFakeFilm());
    const favourite = new Array(FILM_MOCK_AMOUNT)
      .fill(makeFakeFilm())
      .filter((film) => film.isFavourite);
    const promo = makeFakeFilm();

    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthStatus.NotAuth,
          user: makeFakeUser(),
        },
        FILM: {
          genre: Genre.All,
          filmList: films,
          filmsByGenre: films,
          favouriteFilmList: favourite,
          promo: promo,
          isLoadingCompleted: {promo: true, films: true, favourite: true},
        }
      })}
      >
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getByText('Catalog');
    expect(headerElement).toBeInTheDocument();
  });
});
