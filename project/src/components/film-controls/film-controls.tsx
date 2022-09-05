import { APIRoute, AppRoute, AuthStatus } from '../../const';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchFavouriteAction, fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useState } from 'react';

import Film from '../../types/film';
import api from '../../services/api';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFavourites } from '../../store/film-process/selectors';

type FilmControlsProps = {
  film: Film;
}

function FilmControls({film}: FilmControlsProps): JSX.Element {
  const favouritesCount = useAppSelector(getFavourites).length;
  const authStatus = useAppSelector(getAuthorizationStatus);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavourite, setFavourite] = useState(
    authStatus === AuthStatus.Auth
      ? film.isFavorite
      : false
  );
  const [statusChanged, setStatusChanged] = useState(false);

  const handleFavouriteButtonClick = () => {
    if (authStatus === AuthStatus.NotAuth) { navigate(AppRoute.Login); }
    setFavourite(!isFavourite);
    setStatusChanged(true);
  };

  useEffect(() => {
    const changeFilmStatus = async () => {
      await api.post(`${APIRoute.Favourite}/${film.id}/${isFavourite ? 1 : 0}`)
        .then(() => {
          setStatusChanged(false);
          dispatch(fetchPromoAction());
          dispatch(fetchFilmsAction());
          dispatch(fetchFavouriteAction());
        });
    };

    if(statusChanged) { changeFilmStatus(); }

    if (authStatus === AuthStatus.NotAuth) { setFavourite(false); }

  }, [statusChanged, authStatus]);

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={() => {
          navigate(
            `/player/${film.id}`, {
              state: {
                filmRef: film.videoLink,
                poster: film.bigPosterSrc,
              }
            }
          );
        }}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>

      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleFavouriteButtonClick}
      >
        <svg viewBox="0 0 19 20" width="19" height="20">
          {
            (isFavourite)
              ? <use xlinkHref="#in-list"></use>
              : <use xlinkHref="#add"></use>
          }
        </svg>
        <span>My list</span>
        {
          authStatus === AuthStatus.Auth &&
          <span className="film-card__count">{favouritesCount}</span>
        }
      </button>

      { (pathname !== AppRoute.Root && authStatus === AuthStatus.Auth) &&
      <Link
        className="btn film-card__button"
        to={`${pathname}/review`}
        state={{ film: film }}
      >Add review
      </Link>}
    </div>
  );
}

export default FilmControls;
