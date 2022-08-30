import {
  render,
  screen
} from '@testing-library/react';

import Footer from './footer';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
