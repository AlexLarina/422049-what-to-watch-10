import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import Review from './review';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../test/mocks';

describe('Component: Details', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const review = makeFakeReview();

    render(
      <HistoryRouter history={history}>
        <Review review={review}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(review.rating)).toBeInTheDocument();
  });
});

