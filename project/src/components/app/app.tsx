import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Film from '../../types/film';
import { AppRoute, AuthStatus, SHOWN_FILM_LIMIT, MOVIE_REF } from '../../const';

import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  filmData: Film[];
  promoFilm: Film;
}

function App({filmData, promoFilm}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen
              filmData={filmData.slice(0, SHOWN_FILM_LIMIT)}
              promoFilm={promoFilm}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.UserFilmList}
          element={
            <PrivateRoute authStatus={AuthStatus.Auth}>
              <MyListScreen
                filmData={filmData.slice(0, SHOWN_FILM_LIMIT)}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <MovieScreen />
          }
        />
        <Route
          path={AppRoute.NewReview}
          element={
            <AddReviewScreen
              film={promoFilm}
            />
          }
        />
        <Route
          path={AppRoute.Player}
          element={
            <PlayerScreen
              filmRef={MOVIE_REF}
            />
          }
        />
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
