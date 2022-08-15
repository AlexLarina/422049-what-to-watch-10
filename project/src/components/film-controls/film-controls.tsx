import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import Film from '../../types/film';
import { useAppSelector } from '../../hooks';

type FilmControlsProps = {
  film: Film;
}

function FilmControls({film}: FilmControlsProps): JSX.Element {
  const favouritesCount = useAppSelector((state) => state.favouriteFilmList.length);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={() => { navigate(AppRoute.Player); }}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>

      <button
        className="btn btn--list film-card__button"
        type="button"
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">{favouritesCount}</span>
      </button>

      <Link
        className="btn film-card__button"
        to={`${pathname}/review`}
        state={{ film: film }}
      >Add review
      </Link>
    </div>
  );
}

export default FilmControls;
