import Film from '../../types/film';
import FilmCard from '../film-card/film-card';
import React from 'react';
import { SHOWN_FILM_LIMIT } from '../../const';
import ShowMore from '../show-more/show-more';

type FilmListProps = {
    filmData: Film[];
}

function FilmList({filmData}: FilmListProps): JSX.Element {
  const [, setActiveFilm] = React.useState(filmData[0]);
  const [countShown, setCountShown] = React.useState(SHOWN_FILM_LIMIT);

  const onShowMore = () => {
    (countShown + SHOWN_FILM_LIMIT > filmData.length)
      ? setCountShown(filmData.length)
      : setCountShown(countShown + SHOWN_FILM_LIMIT);
  };

  return (
    <>
      <div className="catalog__films-list">
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
      {
        // eslint-disable-next-line no-console
        console.log(countShown)
      }
      {countShown < filmData.length ? <ShowMore onShowMore={onShowMore} /> : null}
      {/* <ShowMore onShowMore={onShowMore} /> */}
    </>
  );
}

export default FilmList;
