import { AppDispatch, State } from '../types/state';
import { loadFilms, setLoadingStatus } from './action';

import { APIRoute } from '../const';
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
