import { chooseGenre, getFavourites, getFilms, loadFilms, setLoadingStatus } from './action';

import { Genre } from '../const';
import { InitialState } from '../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: InitialState = {
  genre: Genre.All,
  fullFilmList: [],
  filmList: [],
  favouriteFilmList: [],
  isLoadingCompleted: false,
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
      .addCase(setLoadingStatus, (state, action) => {
        state.isLoadingCompleted = action.payload;
      });
  }
);

export {reducer};
