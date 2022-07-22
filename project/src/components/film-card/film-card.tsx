
import { Link } from 'react-router-dom';
import Film from '../../types/film';


type FilmCardProps = {
  film: Film,
  onFilmCardHover: (film: Film) => void;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, onFilmCardHover} = props;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => onFilmCardHover(film)} >
      <div className="small-film-card__image">
        <img src={`img/${film.posterSrc}`} alt={film.title} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`films/${film.id}`}
          state={{ film: film }}
        >{film.title}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
