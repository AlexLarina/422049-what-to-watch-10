import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../../components/history-route/history-route';
import MyListScreen from './my-list-screen';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();

describe('Component: MyListScreen', () => {
  it('should render correctly', () => {
    // const history = createMemoryHistory();

    // render(
    //   <Provider store={mockStore({})}>
    //     <HistoryRouter history={history}>
    //       <MyListScreen />
    //     </HistoryRouter>
    //   </Provider>,
    // );
  });
});
