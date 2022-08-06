import { APIRoute, AuthStatus } from '../const';
import {
  AppDispatch,
  State
} from '../types/state';
import {
  loadFilms,
  loadPromo,
  requireAuth,
  setLoadingStatus
} from './action';

import { ApiFilm } from '../types/api';
import { AxiosInstance } from 'axios';
import Film from '../types/film';
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
