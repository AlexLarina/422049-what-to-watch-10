import { AuthStatus, Genre } from '../const';
import { chooseGenre, getFavourites, getFilms, loadFilms, loadPromo, requireAuth, setLoadingStatus } from './action';

import { InitialState } from '../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: InitialState = {
  genre: Genre.All,
  fullFilmList: [],
  filmList: [],
  favouriteFilmList: [],
  isLoadingCompleted: false,
  promo: null,
  authorizationStatus: AuthStatus.Unknown,
};

const reducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(chooseGenre, (state, action) => {
        const {genre} = action.payload;
        state.genre = genre;
      })
      .addCase(getFilms, (state) => {
        state.filmList = state.genre === Genre.All
          ? state.fullFilmList :
          state.fullFilmList.filter((film) => film.genre === state.genre);
      })
      .addCase(getFavourites, (state) => {
        state.favouriteFilmList = state.fullFilmList.filter((film) => film.isFavorite);
      })
      .addCase(loadFilms, (state, action) => {
        state.fullFilmList = action.payload;
        state.filmList = action.payload;
      })
      .addCase(loadPromo, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(setLoadingStatus, (state, action) => {
        state.isLoadingCompleted = action.payload;
      })
      .addCase(requireAuth, (state, action) => {
        state.authorizationStatus = action.payload;
      });
  }
);

export {reducer};
