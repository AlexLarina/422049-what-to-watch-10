import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import FilmControls from './film-controls';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: FilmControls', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();
    render(
      <Provider store={
        mockStore({
          favouriteFilmList: new Array(3),
          authStatus: AuthStatus.Auth
        })
      }
      >
        <HistoryRouter history={history}>
          <FilmControls film={film}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
