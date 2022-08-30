import {
  render,
  screen
} from '@testing-library/react';

import AddReview from './add-review';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
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
          <AddReview color={film.backgroundColor} filmID={film.id} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
