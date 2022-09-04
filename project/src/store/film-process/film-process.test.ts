import { FILM_MOCK_AMOUNT, Genre } from '../../const';
import { chooseGenre, filmProcess } from './film-process';
import {
  fetchFavouriteAction,
  fetchFilmsAction,
  fetchPromoAction
} from '../api-actions';

import { FilmProcess } from '../../types/state';
import { makeFakeFilm } from '../../test/mocks';

describe('Reducer: FilmProcess', () => {
  let state: FilmProcess;

  beforeEach(() => {
    state = {
      genre: Genre.All,
      filmList: [],
      favouriteFilmList: [],
      filmsByGenre: [],
      promo: null,
      isLoadingCompleted: {promo: false, films: false, favourite: false},
    };
  });

  describe('chooseGenre', () => {
    it('should set a given value to state genre field', () => {
      const mockGenre = 'Comedy';
      expect(filmProcess.reducer(state, chooseGenre(mockGenre)))
        .toEqual({...state, genre: mockGenre});
    });
  });

  describe('Loaded data', () => {
    it('should update filmList by load films', () => {
      const films = [...new Array(FILM_MOCK_AMOUNT)].map(() => makeFakeFilm());
      expect(filmProcess.reducer(state,
        {type: fetchFilmsAction.fulfilled.type, payload: films}))
        .toEqual({
          ...state,
          filmList: films,
          isLoadingCompleted: {...state.isLoadingCompleted, films: true}
        });
    });

    it('should update promo by load promo film', () => {
      const promoFilm = makeFakeFilm();
      expect(filmProcess.reducer(state,
        {type: fetchPromoAction.fulfilled.type, payload: promoFilm}))
        .toEqual({
          ...state,
          promo: promoFilm,
          isLoadingCompleted: {...state.isLoadingCompleted, promo: true}
        });
    });

    it('should update favouriteFilmList by load favourites', () => {
      const favs = [...new Array(FILM_MOCK_AMOUNT)]
        .map(() => makeFakeFilm())
        .filter((film) => film.isFavorite);

      expect(filmProcess.reducer(state,
        {type: fetchFavouriteAction.fulfilled.type, payload: favs}))
        .toEqual({
          ...state,
          favouriteFilmList: favs,
          isLoadingCompleted: {...state.isLoadingCompleted, favourite: true}
        });
    });
  });
});
