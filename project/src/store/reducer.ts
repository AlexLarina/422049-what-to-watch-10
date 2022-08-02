import { chooseGenre, getFilms } from './action';

import { FILM_DATA } from '../mocks/films';
import Film from '../types/film';
import { Genre } from '../const';
import { createReducer } from '@reduxjs/toolkit';

const initialState: {
  genre: string,
  filmList: Film[],
} = {
  genre: Genre.All,
  filmList: FILM_DATA,
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
          ? FILM_DATA :
          FILM_DATA.filter((film) => film.genre === state.genre);
      });
  }
);

export {reducer};
