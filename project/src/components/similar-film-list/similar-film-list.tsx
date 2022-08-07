import { useEffect, useState } from 'react';

import { APIRoute } from '../../const';
import { ApiFilm } from '../../types/api';
import Film from '../../types/film';
import FilmList from '../film-list/film-list';
import api from '../../services/api';
import { filmFromApi } from '../../services/adapters/film';

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
        .map((similarFilm) => filmFromApi(similarFilm));
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
