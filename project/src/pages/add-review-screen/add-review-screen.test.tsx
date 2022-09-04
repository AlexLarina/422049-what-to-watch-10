import {
  render,
  screen
} from '@testing-library/react';

import AddReviewScreen from './add-review-screen';
import { AuthStatus } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: {
      film: {},
    }
  })
}));

describe('Component: AddReviewScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthStatus.NotAuth,
        }
      })}
      >
        <HistoryRouter history={history}>
          <AddReviewScreen />
        </HistoryRouter>
      </Provider>,
    );

    const spanElement = screen.getByText('Add review');

    expect(spanElement).toBeInTheDocument();
  });
});
