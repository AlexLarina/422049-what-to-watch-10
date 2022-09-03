import {
  AppDispatch,
  State
} from '../types/state';
import {
  dropToken,
  saveToken
} from '../services/token';

import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { AxiosInstance } from 'axios';
import Film from '../types/film';
import { UserData } from '../types/user-data';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  saveUserAuthInfo,
} from './action';

type thunkOptions = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
};

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, thunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Film, undefined, thunkOptions>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

export const fetchFavouriteAction = createAsyncThunk<Film[], undefined, thunkOptions>(
  'data/fetchFavourite',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Favourite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/requireAuth',
  async (_arg, {dispatch, extra: api}) => await api.get(APIRoute.Login)
);

export const loginAction = createAsyncThunk<void, AuthData, thunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    await api.post<UserData>(APIRoute.Login, {email, password})
      .then(({data}) => {
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
  }
);
