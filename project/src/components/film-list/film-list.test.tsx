import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import FilmList from './film-list';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: FilmList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const films = new Array(2).fill(makeFakeFilm());
    render(
      <Provider store={
        mockStore({
          FILM: { favouriteFilmList: new Array(3) },
          USER: { authStatus: AuthStatus.Auth },
        })
      }
      >
        <HistoryRouter history={history}>
          <FilmList filmData={films}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('catalog__films-list')).toBeInTheDocument();
  });
});
