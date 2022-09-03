import { Genre, NameSpace } from '../../const';

import Film from '../../types/film';
import { State } from '../../types/state';
import { createSelector } from 'reselect';

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

export const getFilmsByGenre = (state: State): Film[] => (
  state[NameSpace.Film].filmsByGenre
);

export const filterFilms = createSelector(
  [getFilms, getGenre],
  (films, genre) => {
    if (genre === Genre.All) { return films; }

    return films.filter(((film) => film.genre === genre));
  }
);
