import { AppLimit, AuthStatus } from '../../const';
import { makeFakeFilm, makeFakeUser } from '../../test/mocks';
import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../../components/history-route/history-route';
import MyListScreen from './my-list-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('Component: MyListScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const favourite = new Array(AppLimit.FilmMocked)
      .fill(makeFakeFilm())
      .filter((film) => film.isFavourite);

    render(
      <Provider store={mockStore({
        FILM: {
          favouriteFilmList: favourite,
        },
        USER: {
          authorizationStatus: AuthStatus.Auth,
          user: makeFakeUser(),
        },
      })}
      >
        <HistoryRouter history={history}>
          <MyListScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
