import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Film from '../../types/film';
import { PREVIEW_TIMEOUT } from '../../const';
import VideoPlayer from '../video-player/video-player';

type FilmCardProps = {
  film: Film,
  onFilmCardHover: (film: Film) => void;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, onFilmCardHover} = props;
  const [isCursorHold, setCursorHold] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate(`films/${film.id}`);
  }

  function handleMouseOver() {
    setCursorHold(true);
    onFilmCardHover(film);
  }

  function handleMouseOut() {
    setCursorHold(false);
    setShowPreview(false);
  }

  useEffect(() => {
    if (!isCursorHold) {
      return;
    }

    const timer = setTimeout(() => {
      setShowPreview(true);
    }, PREVIEW_TIMEOUT);

    return () => clearTimeout(timer);
  }, [handleMouseOver, handleMouseOut]);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
    >
      <div className="small-film-card__image">
        {showPreview ? (
          <VideoPlayer
            posterSrc={film.posterSrc}
            src={film.previewVideoLink}
            startPlaying={showPreview}
          />
        ) : (
          <img src={film.posterSrc} alt={film.title} width="280" height="175"/>
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={`films/${film.id}`}
          state={{ filmID: film.id }}
        >{film.title}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
