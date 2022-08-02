import { FILM_DATA } from '../mocks/films';
import Film from '../types/film';
import { Genre } from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { getFilms } from './action';

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
      .addCase(getFilms, (state) => {
        state.filmList = FILM_DATA;
      });
  }
);

export {reducer};
