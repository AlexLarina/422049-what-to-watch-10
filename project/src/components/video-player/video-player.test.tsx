import {
  render,
  screen
} from '@testing-library/react';

import HistoryRouter from '../history-route/history-route';
import VideoPlayer from './video-player';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../test/mocks';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();

    render(
      <HistoryRouter history={history}>
        <VideoPlayer posterSrc={film.posterSrc} src={film.videoLink} startPlaying/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('film-card-video-element')).toBeInTheDocument();
  });
});

