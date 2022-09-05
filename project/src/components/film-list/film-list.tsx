import { useEffect, useState } from 'react';

import { AppLimit } from '../../const';
import Film from '../../types/film';
import FilmCard from '../film-card/film-card';
import ShowMore from '../show-more/show-more';

type FilmListProps = {
    filmData: Film[];
}

function FilmList({filmData}: FilmListProps): JSX.Element {
  const [, setActiveFilm] = useState(filmData[0]);
  const [countShown, setCountShown] = useState(AppLimit.FilmShown);

  const showMoreClickHandler = () => {
    (countShown + AppLimit.FilmShown > filmData.length)
      ? setCountShown(filmData.length)
      : setCountShown(countShown + AppLimit.FilmShown);
  };

  useEffect(() => {
    setCountShown(AppLimit.FilmShown);
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
