import { AppRoute, AuthStatus, FILM_MOCK_AMOUNT, Genre } from '../../const';
import { makeFakeFilm, makeFakeUser } from '../../test/mocks';
import {
  render,
  screen
} from '@testing-library/react';

import App from './app';
import HistoryRouter from '../history-route/history-route';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

const mockStore = configureMockStore();
const films = new Array(FILM_MOCK_AMOUNT).fill(makeFakeFilm());
const favourite = new Array(FILM_MOCK_AMOUNT)
  .fill(makeFakeFilm())
  .filter((film) => film.isFavourite);
const promo = makeFakeFilm();

const store = mockStore({
  USER: {
    authorizationStatus: AuthStatus.NotAuth,
    user: makeFakeUser(),
  },
  FILM: {
    genre: Genre.All,
    filmList: films,
    filmsByGenre: films,
    favouriteFilmList: favourite,
    promo: promo,
    isLoadingCompleted: {promo: true, films: true, favourite: true},
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: {
      filmRef: '',
      poster: '',
    }
  })
}));

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "MovieScreen" with loading message when user navigate to "/films/:id"', () => {
    history.push(`/films/${promo.id}`);

    render(fakeApp);

    expect(screen.getByText('Data loading...')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/films/:id/review" and not auth', () => {
    history.push(`/films/${promo.id}/review`);

    render(fakeApp);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "PlayerScreen" when user navigate to "/player/:id"', () => {
    history.push(`/player/${promo.id}`);

    render(fakeApp);

    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/mylist" and not auth', () => {
    history.push(AppRoute.UserFilmList);

    render(fakeApp);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('main page')).toBeInTheDocument();
  });
});
