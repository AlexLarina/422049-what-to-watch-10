import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../../components/history-route/history-route';
import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    // const history = createMemoryHistory();

    // render(
    //   <Provider store={mockStore({})}>
    //     <HistoryRouter history={history}>
    //       <MainScreen />
    //     </HistoryRouter>
    //   </Provider>,
    // );

    // const headerElement = screen.getByText('Catalog');

    // expect(headerElement).toBeInTheDocument();
  });
});
