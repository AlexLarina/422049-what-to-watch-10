import {
  render,
  screen
} from '@testing-library/react';

import { AuthStatus } from '../../const';
import Header from './header';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({
        USER: {
          authStatus: AuthStatus.NotAuth,
        },
      })}
      >
        <HistoryRouter history={history}>
          <Header headerClass={''}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('page-header')).toBeInTheDocument();
  });
});
