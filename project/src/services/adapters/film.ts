import { ApiFilm } from '../../types/api';
import Film from '../../types/film';

export const filmFromApi = (apiFilm: ApiFilm) => {
  const film = {
    title: apiFilm.name,
    posterSrc: apiFilm.posterImage,
    year: apiFilm.released,
    bigPosterSrc: apiFilm.backgroundImage,
    rating: apiFilm.rating?.toFixed(1),
    ...apiFilm,
  };

  delete film['name'];
  delete film['posterImage'];
  delete film['released'];
  delete film['backgroundImage'];

  return film as Film;
};
