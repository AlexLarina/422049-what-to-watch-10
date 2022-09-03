import { fetchFavouriteAction, fetchFilmsAction, fetchPromoAction } from '../api-actions';

import { ApiFilm } from '../../types/api';
import { DataProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { adaptFilmFromApi } from '../../services/adapters/film';
import { createSlice } from '@reduxjs/toolkit';

const initialState: DataProcess = {
  fullFilmList: [],
  filmList: [],
  favouriteFilmList: [],
  isLoadingCompleted: {promo: false, films: false, favourite: false},
  promo: null,
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
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
