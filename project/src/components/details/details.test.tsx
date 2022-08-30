import {
  render,
  screen
} from '@testing-library/react';

import Details from './details';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

describe('Component: Details', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Details film={makeFakeFilm()}/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
  });
});

