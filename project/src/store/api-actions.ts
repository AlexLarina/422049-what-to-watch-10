import { APIRoute, AuthStatus } from '../const';
import {
  AppDispatch,
  State
} from '../types/state';
import {
  loadFilms,
  loadPromo,
  requireAuth,
  saveUserAuthInfo,
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
import { saveToken } from '../services/token';

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

export const checkAuthAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/requireAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get(APIRoute.Login)
      .then(
        ()=>{
          dispatch(requireAuth(AuthStatus.Auth));
        },
        () => {
          dispatch(requireAuth(AuthStatus.NotAuth));
        });
  }
);

export const loginAction = createAsyncThunk<void, AuthData, thunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(saveUserAuthInfo(data));
    saveToken(data.token);
  }
);
