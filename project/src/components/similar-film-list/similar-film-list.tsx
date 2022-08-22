import { APIRoute, SIMILAR_FILM_LIMIT } from '../../const';
import { useEffect, useState } from 'react';

import { ApiFilm } from '../../types/api';
import Film from '../../types/film';
import FilmList from '../film-list/film-list';
import { adaptFilmFromApi } from '../../services/adapters/film';
import api from '../../services/api';

type SimilarFilmListProps = {
  filmID: number;
};

function SimilarFilmList({filmID}: SimilarFilmListProps): JSX.Element {
  const [films, setFilms] = useState([] as Film[]);
  const [isLoadingCompleted, setLoadingCompleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await api.get<ApiFilm[]>(`${APIRoute.Films}/${filmID}/similar`);
      const similarFilms = data
        .filter((similarFilm) => similarFilm.id !== filmID)
        .slice(0, SIMILAR_FILM_LIMIT)
        .map((similarFilm) => adaptFilmFromApi(similarFilm));
      setLoadingCompleted(!isLoadingCompleted);
      setFilms(similarFilms);
    };

    fetchData();
  }, []);

  if (!isLoadingCompleted) {
    return <p>Data loading...</p>;
  }

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <FilmList filmData={films}/>
    </section>
  );
}

export default SimilarFilmList;
