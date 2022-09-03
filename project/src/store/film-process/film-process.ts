import { Genre, NameSpace } from '../../const';
import { fetchFavouriteAction, fetchFilmsAction, fetchPromoAction } from '../api-actions';

import { ApiFilm } from '../../types/api';
import { FilmProcess } from '../../types/state';
import { adaptFilmFromApi } from '../../services/adapters/film';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FilmProcess = {
  genre: Genre.All,
  fullFilmList: [],
  filmList: [],
  favouriteFilmList: [],
  isLoadingCompleted: {promo: false, films: false, favourite: false},
  promo: null,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    chooseGenre: (state, action) => {
      state.genre = action.payload;
    },
    getFilms: (state) => {
      state.filmList = state.genre === Genre.All
        ? state.fullFilmList :
        state.fullFilmList.filter((film) => film.genre === state.genre);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.isLoadingCompleted.films = true;
        const adaptedFilmList = action.payload
          .map((filmData: ApiFilm) => adaptFilmFromApi(filmData));
        state.fullFilmList = adaptedFilmList;
        state.filmList = adaptedFilmList;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.isLoadingCompleted.promo = true;
        state.promo = adaptFilmFromApi(action.payload);
      })
      .addCase(fetchFavouriteAction.fulfilled, (state, action) => {
        state.isLoadingCompleted.favourite = true;
        const adaptedFilmList = action.payload
          .map((filmData: ApiFilm) => adaptFilmFromApi(filmData));
        state.favouriteFilmList = adaptedFilmList;
      });
  }
});

export const {chooseGenre, getFilms} = filmProcess.actions;
