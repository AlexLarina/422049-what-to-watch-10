import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import SimilarFilmList from './similar-film-list';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: SimilarFilmList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <SimilarFilmList filmID={film.id} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Data loading...')).toBeInTheDocument();
  });
});
