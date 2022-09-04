import { useEffect, useState } from 'react';

import Film from '../../types/film';
import FilmCard from '../film-card/film-card';
import { SHOWN_FILM_LIMIT } from '../../const';
import ShowMore from '../show-more/show-more';

type FilmListProps = {
    filmData: Film[];
}

function FilmList({filmData}: FilmListProps): JSX.Element {
  const [, setActiveFilm] = useState(filmData[0]);
  const [countShown, setCountShown] = useState(SHOWN_FILM_LIMIT);

  const showMoreClickHandler = () => {
    (countShown + SHOWN_FILM_LIMIT > filmData.length)
      ? setCountShown(filmData.length)
      : setCountShown(countShown + SHOWN_FILM_LIMIT);
  };

  useEffect(() => {
    setCountShown(SHOWN_FILM_LIMIT);
  }, [filmData]);

  return (
    <>
      <div className="catalog__films-list" data-testid="catalog__films-list">
        {
          filmData.slice(0, countShown).map((film: Film) => (
            <FilmCard
              key={`film-${film.id}`}
              film={film}
              onFilmCardHover={() => { setActiveFilm(film); }}
            />
          ))
        }
      </div>
      {countShown < filmData.length ? <ShowMore onShowMore={showMoreClickHandler} /> : null}
    </>
  );
}

export default FilmList;
