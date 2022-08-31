import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import Overview from './overview';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

describe('Component: Overview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();

    render(
      <HistoryRouter history={history}>
        <Overview film={film}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${film.scoresCount} ratings`)).toBeInTheDocument();
  });
});
