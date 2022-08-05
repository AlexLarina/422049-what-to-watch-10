import { AppRoute, AuthStatus, MOVIE_REF } from '../../const';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MovieScreen from '../../pages/movie-screen/movie-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const {isLoadingCompleted} = useAppSelector((state) => state);

  if (!isLoadingCompleted) {
    return (
      <p>Данные загружаются...</p>
    );
  }

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
            <PrivateRoute authStatus={AuthStatus.Auth}>
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
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
