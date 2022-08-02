import Film from '../../types/film';
import { Genre } from '../../const';
import { useState } from 'react';

type GenreListProps = {
  filmData: Film[];
};

function GenreList({filmData}: GenreListProps): JSX.Element {
  const genreList = [Genre.All, ...filmData.map((film) => film.genre)];
  const uniqueGenreList = [...new Set(genreList)];

  const [activeGenre, setActiveGenre] = useState(Genre.All as string);

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
