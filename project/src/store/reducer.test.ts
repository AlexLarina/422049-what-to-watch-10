import { chooseGenre, getFilms, loadFavourite, loadFilms, loadPromo, requireAuth, saveUserAuthInfo, setLoadingFavouriteStatus, setLoadingFilmsStatus, setLoadingPromoStatus } from './action';
import { makeFakeFilm, makeFakeUser } from '../test/mocks';

import { AuthStatus } from '../const';
import { Genre } from '../const';
import { InitialState } from '../types/state';
import { reducer } from './reducer';

const FILM_AMOUNT = 1;

describe('Reducer', () => {
  let state: InitialState;

  beforeEach(() => {
    state = {
      genre: Genre.All,
      fullFilmList: [],
      filmList: [],
      favouriteFilmList: [],
      promo: null,
      isLoadingCompleted: {promo: false, films: false, favourite: false},
      authorizationStatus: AuthStatus.Unknown,
      user: null,
    };
  });

  // chooseGenre,
  it('should set a given value to state genre field', () => {
    const mockGenre = 'Comedy';
    expect(reducer(state, chooseGenre({genre: mockGenre})))
      .toEqual({...state, genre: mockGenre});
  });
  // getFilms - All genre,
  it('should set a full filmlist to state filmList field when All genres chosen', () => {
    const films = new Array(FILM_AMOUNT).fill(makeFakeFilm());
    state = {...state, fullFilmList: films};
    expect(reducer(state, getFilms()))
      .toEqual({...state, filmList: films});
  });
  // getFilms - Particular genre,
  it('should set a filtered filmlist to state filmList field when particular genre chosen', () => {
    const films = new Array(FILM_AMOUNT).fill(makeFakeFilm());
    const someGenre = films[0].genre;
    const filteredFilmsByGenre = films.filter((film) => film.genre === someGenre);
    state = {...state, fullFilmList: films, genre: someGenre};
    expect(reducer(state, getFilms()))
      .toEqual({...state, filmList: filteredFilmsByGenre});
  });
  // loadFavourite,
  it('should set a given film array to state favouriteFilmList field', () => {
    const favourites = new Array(20).fill(makeFakeFilm()).filter((film) => film.isFavorite);
    expect(reducer(state, loadFavourite(favourites)))
      .toEqual({...state, favouriteFilmList: favourites});
  });
  // loadFilms,
  it('should set a given film array to state filmList and fullFilmList fields', () => {
    const films = new Array(FILM_AMOUNT).fill(makeFakeFilm());
    expect(reducer(state, loadFilms(films)))
      .toEqual({...state, filmList: films, fullFilmList: films});
  });
  // loadPromo,
  it('should set a given promo film to state promo field', () => {
    const mockFilm = makeFakeFilm();
    expect(reducer(state, loadPromo(mockFilm)))
      .toEqual({...state, promo: mockFilm});
  });
  // requireAuth,
  it('should set given auth status to authorizationStatus field', () => {
    expect(reducer(state, requireAuth(AuthStatus.Auth)))
      .toEqual({...state, authorizationStatus: AuthStatus.Auth});

    expect(reducer(state, requireAuth(AuthStatus.NotAuth)))
      .toEqual({...state, authorizationStatus: AuthStatus.NotAuth});
  });
  // saveUserAuthInfo,
  it('should set given user data to user state field', () => {
    const user = makeFakeUser();

    expect(reducer(state, saveUserAuthInfo(user)))
      .toEqual({...state, user: user});
  });
  // setLoadingFavouriteStatus,
  it('should set given loading status for favourite', () => {
    expect(reducer(state, setLoadingFavouriteStatus({favourite: true})))
      .toEqual({...state, isLoadingCompleted: {...state.isLoadingCompleted, favourite: true}});
  });
  // setLoadingFilmsStatus,
  it('should set given loading status for films', () => {
    expect(reducer(state, setLoadingFilmsStatus({films: true})))
      .toEqual({...state, isLoadingCompleted: {...state.isLoadingCompleted, films: true}});
  });
  // setLoadingPromoStatus,
  it('should set given loading status for promo', () => {
    expect(reducer(state, setLoadingPromoStatus({promo: true})))
      .toEqual({...state, isLoadingCompleted: {...state.isLoadingCompleted, promo: true}});
  });
});
