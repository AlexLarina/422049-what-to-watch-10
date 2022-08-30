import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../../components/history-route/history-route';
import LoginScreen from './login-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
describe('Component: LoginScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={mockStore({})}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    const emailLabelElement = screen.getByLabelText('Email address');
    const passwordLabelElement = screen.getByLabelText('Password');

    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
  });
});
