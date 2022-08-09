import { AppRoute, MOVIE_REF } from '../../const';
import { Route, Routes } from 'react-router-dom';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import HistoryRouter from '../history-route/history-route';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../services/browser-history';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const {isLoadingCompleted} = useAppSelector((state) => state);

  if (!isLoadingCompleted) {
    return (
      <p>Данные загружаются...</p>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
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
            <PrivateRoute>
              <MyListScreen />
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
            <PrivateRoute>
              <AddReviewScreen />
            </PrivateRoute>
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
        <Route
          path={AppRoute.NotFound}
          element={
            <NotFoundScreen />
          }
        />
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
