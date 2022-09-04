import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/not_found');

    render(
      <Provider store={mockStore({
        USER: {
          authorizationStatus: AuthStatus.NotAuth,
        },
      })}
      >
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getByText('404');
    const linkElement = screen.getByText('main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
