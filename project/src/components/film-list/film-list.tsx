import React from 'react';
import Film from '../../types/film';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
    filmData: Film[];
}

function FilmList({filmData}: FilmListProps): JSX.Element {
  const [, setActiveFilm] = React.useState(filmData[0]);

  return (
    <div className="catalog__films-list">
      {
        filmData.map((film: Film) => (
          <FilmCard
            key={`film-${film.id}`}
            film={film}
            onFilmCardHover={() => { setActiveFilm(film); }}
          />
        ))
      }
    </div>
  );
}

export default FilmList;
