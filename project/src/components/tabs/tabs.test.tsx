import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import Tabs from './tabs';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: AddReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();
    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <Tabs film={film} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('film-nav')).toBeInTheDocument();
  });
});
