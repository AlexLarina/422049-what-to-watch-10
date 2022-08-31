import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import RatePoint from './rate-point';
import { createMemoryHistory } from 'history';

describe('Component: RatePoint', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const pointID = 10;

    render(
      <HistoryRouter history={history}>
        <RatePoint pointID={pointID} onChange={jest.fn()}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`Rating ${pointID}`)).toBeInTheDocument();
  });
});
