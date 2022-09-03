// fullFilmList: [],
// filmList: [],

import Film from '../../types/film';
import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: State): string => (
  state[NameSpace.Film].genre
);

export const getLoadingStatus = (state: State):
  {promo: boolean, films: boolean, favourite: boolean} => (
  state[NameSpace.Film].isLoadingCompleted
);

export const getPromo = (state: State): Film | null => (
  state[NameSpace.Film].promo
);

export const getFavourites = (state: State): Film[] => (
  state[NameSpace.Film].favouriteFilmList
);

export const getFilms = (state: State): Film[] => (
  state[NameSpace.Film].filmList
);
