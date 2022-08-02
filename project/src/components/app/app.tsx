import { AppRoute, AuthStatus, MOVIE_REF, SHOWN_FILM_LIMIT } from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import Film from '../../types/film';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
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
            <MainScreen />
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
