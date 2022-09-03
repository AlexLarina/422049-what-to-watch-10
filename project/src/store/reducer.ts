import { AuthStatus, Genre } from '../const';
import {
  chooseGenre,
  getFilms,
  loadFavourite,
  loadFilms,
  loadPromo,
  saveUserAuthInfo,
  setLoadingFavouriteStatus,
  setLoadingFilmsStatus,
  setLoadingPromoStatus,
} from './action';

import { InitialState } from '../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: InitialState = {
  genre: Genre.All,
  fullFilmList: [],
  filmList: [],
  favouriteFilmList: [],
  isLoadingCompleted: {promo: false, films: false, favourite: false},
  promo: null,
  authorizationStatus: AuthStatus.Unknown,
  user: null,
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
      .addCase(loadFilms, (state, action) => {
        state.fullFilmList = action.payload;
        state.filmList = action.payload;
      })
      .addCase(loadPromo, (state, action) => {
        state.promo = action.payload;
      })
      .addCase(loadFavourite, (state, action) => {
        state.favouriteFilmList = action.payload;
      })
      .addCase(setLoadingPromoStatus, (state, action) => {
        const {promo} = action.payload;
        state.isLoadingCompleted = {...state.isLoadingCompleted, promo};
      })
      .addCase(setLoadingFilmsStatus, (state, action) => {
        const {films} = action.payload;
        state.isLoadingCompleted = {...state.isLoadingCompleted, films};
      })
      .addCase(setLoadingFavouriteStatus, (state, action) => {
        const {favourite} = action.payload;
        state.isLoadingCompleted = {...state.isLoadingCompleted, favourite};
      })
      .addCase(saveUserAuthInfo, (state, action) => {
        state.user = action.payload;
      });
  }
);

export {reducer};
