import Film from '../../types/film';
import FilmControls from '../film-controls/film-controls';
import Header from '../header/header';
import { useAppSelector } from '../../hooks';

function FilmPromo(): JSX.Element {
  const film = useAppSelector((state) => state.promo) as Film;
  const isPromoLoaded = useAppSelector((state) => state.isLoadingCompleted.promo);

  if (!isPromoLoaded) {
    return <p>Data loading...</p>;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.bigPosterSrc} alt={film.title}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header headerClass='film-card__head'/>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={film.posterSrc}
              alt={`${film.title} poster`}
              width="218"
              height="327"
            />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.title}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.year}</span>
            </p>

            <FilmControls film={film}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmPromo;
