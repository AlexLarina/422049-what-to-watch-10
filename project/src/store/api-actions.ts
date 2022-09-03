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
  'data/fetchPromo',
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

export const checkAuthAction = createAsyncThunk<UserData, undefined, thunkOptions>(
  'user/requireAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, thunkOptions>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(fetchFavouriteAction());
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, thunkOptions>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
