import { APIRoute, AuthStatus } from '../const';
import {
  AppDispatch,
  State
} from '../types/state';
import {
  dropToken,
  saveToken
} from '../services/token';
import {
  loadFavourite,
  loadFilms,
  loadPromo,
  requireAuth,
  saveUserAuthInfo,
  setLoadingFavouriteStatus,
  setLoadingFilmsStatus,
  setLoadingPromoStatus,
} from './action';

import { ApiFilm } from '../types/api';
import { AuthData } from '../types/auth-data';
import { AxiosInstance } from 'axios';
import Film from '../types/film';
import { UserData } from '../types/user-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { filmFromApi } from '../services/adapters/film';

type thunkOptions = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
};

export const fetchFilmsAction = createAsyncThunk<void, undefined, thunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setLoadingFilmsStatus({films: true}));
    const adaptedFilmList = data.map((filmData: ApiFilm) => filmFromApi(filmData));
    dispatch(loadFilms(adaptedFilmList));
  },
);

export const fetchPromoAction = createAsyncThunk<void, undefined, thunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(setLoadingPromoStatus({promo: true}));
    dispatch(loadPromo(filmFromApi(data)));
  },
);

export const fetchFavouriteAction = createAsyncThunk<void, undefined, thunkOptions>(
  'data/fetchFavourite',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Favourite);
    const adaptedFavouriteFilmList = data.map((filmData: ApiFilm) => filmFromApi(filmData));
    dispatch(setLoadingFavouriteStatus({favourite: true}));
    dispatch(loadFavourite(adaptedFavouriteFilmList));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/requireAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login)
      .then(
        ({data}) => {
          dispatch(requireAuth(AuthStatus.Auth));
          dispatch(saveUserAuthInfo(data));
        },
        () => {
          dispatch(requireAuth(AuthStatus.NotAuth));
        });
  }
);

export const loginAction = createAsyncThunk<void, AuthData, thunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    await api.post<UserData>(APIRoute.Login, {email, password})
      .then(({data}) => {
        dispatch(requireAuth(AuthStatus.Auth));
        dispatch(saveUserAuthInfo(data));
        saveToken(data.token);
        dispatch(fetchFavouriteAction());
      });
  }
);

export const logoutAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuth(AuthStatus.NotAuth));
  }
);
