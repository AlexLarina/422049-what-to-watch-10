import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import UserBlock from './user-block';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { makeFakeUser } from '../../test/mocks';

const mockStore = configureMockStore();

describe('Component: UserBlock', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const user = makeFakeUser();
    render(
      <Provider store={
        mockStore({
          USER: {
            authorizationStatus: AuthStatus.Auth,
            user: user,
          }
        })
      }
      >
        <HistoryRouter history={history}>
          <UserBlock />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
