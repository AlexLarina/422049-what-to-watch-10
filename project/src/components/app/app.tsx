import {
  Route,
  Routes
} from 'react-router-dom';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import { getLoadingStatus } from '../../store/film-process/selectors';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const loadingStatuses = useAppSelector(getLoadingStatus);

  if (!loadingStatuses.promo || !loadingStatuses.films) {
    return (
      <p>Данные загружаются...</p>
    );
  }

  return (
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
          <PlayerScreen />
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
  );
}

export default App;
