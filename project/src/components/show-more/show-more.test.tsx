import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import ShowMore from './show-more';
import { createMemoryHistory } from 'history';

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ShowMore onShowMore={jest.fn()} />
      </HistoryRouter>,
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
