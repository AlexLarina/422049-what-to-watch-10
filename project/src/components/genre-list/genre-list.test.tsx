import {
  render,
  screen
} from '@testing-library/react';

import { FILM_MOCK_AMOUNT } from '../../const';
import GenreList from './genre-list';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: GenreList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const films = new Array(FILM_MOCK_AMOUNT).fill(makeFakeFilm());
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <GenreList filmData={films}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('All genres')).toBeInTheDocument();
  });
});
