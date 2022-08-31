import {
  render,
  screen
} from '@testing-library/react';

import FilmCard from './film-card';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <FilmCard film={film} onFilmCardHover={jest.fn()} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(film.title)).toBeInTheDocument();
  });
});
