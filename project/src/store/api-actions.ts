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
  setLoadingStatus
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
    dispatch(setLoadingStatus(true));
    const adaptedFilmList = data.map((filmData: ApiFilm) => filmFromApi(filmData));
    dispatch(loadFilms(adaptedFilmList));
  },
);

export const fetchPromoAction = createAsyncThunk<void, undefined, thunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(setLoadingStatus(true));
    dispatch(loadPromo(filmFromApi(data)));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/requireAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NotAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, thunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(saveUserAuthInfo(data));
  }
);
