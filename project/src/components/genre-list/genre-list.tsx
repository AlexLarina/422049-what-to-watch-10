import { AppLimit, Genre } from '../../const';

import Film from '../../types/film';
import { chooseGenre } from '../../store/film-process/film-process';
import { useAppDispatch } from '../../hooks';
import { useState } from 'react';

type GenreListProps = {
  filmData: Film[];
};

function GenreList({filmData}: GenreListProps): JSX.Element {
  const genreList = [Genre.All, ...filmData.map((film) => film.genre)];
  const uniqueGenreList = [...new Set(genreList)].slice(0, AppLimit.GenreShown);

  const [activeGenre, setActiveGenre] = useState(Genre.All as string);
  const dispatch = useAppDispatch();

  return (
    <ul className="catalog__genres-list">
      {uniqueGenreList.map((genre) => (
        <li
          key={genre}
          className={genre === activeGenre
            ? 'catalog__genres-item catalog__genres-item--active'
            : 'catalog__genres-item'}
        >
          <span
            style={{cursor: 'pointer'}}
            className="catalog__genres-link"
            onClick={(e) => {
              e.preventDefault();
              dispatch(chooseGenre(genre));
              setActiveGenre(genre);
            }}
          >
            {genre}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
