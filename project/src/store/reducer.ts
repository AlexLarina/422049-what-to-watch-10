import {
  chooseGenre,
  getFilms,
} from './action';

import { Genre } from '../const';
import { InitialState } from '../types/state';
import { createReducer } from '@reduxjs/toolkit';

const initialState: InitialState = {
  genre: Genre.All,
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
  }
);

export {reducer};
