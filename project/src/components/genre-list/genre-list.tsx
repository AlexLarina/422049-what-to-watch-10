import { Genre, MAX_GENRE_SHOWN } from '../../const';
import { chooseGenre, getFilms } from '../../store/action';

import Film from '../../types/film';
import { useAppDispatch } from '../../hooks';
import { useState } from 'react';

type GenreListProps = {
  filmData: Film[];
};

function GenreList({filmData}: GenreListProps): JSX.Element {
  const genreList = [Genre.All, ...filmData.map((film) => film.genre)];
  const uniqueGenreList = [...new Set(genreList)].slice(0, MAX_GENRE_SHOWN);

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
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(e) => {
              e.preventDefault();
              dispatch(chooseGenre({genre}));
              dispatch(getFilms());
              setActiveGenre(genre);
            }}
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
