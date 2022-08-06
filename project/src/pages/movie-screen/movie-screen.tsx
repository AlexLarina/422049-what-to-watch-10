import { Link, useLocation } from 'react-router-dom';

import FilmList from '../../components/film-list/film-list';
import { FilmState } from '../../types/interface';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks';

function MovieScreen(): JSX.Element {
  const fullFilmList = useAppSelector((state) => state.fullFilmList);
  const { film } = useLocation().state as FilmState;
  const { pathname } = useLocation();

  return (
    <>
      <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.bigPosterSrc} alt={film.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link
                  className="btn film-card__button"
                  to={`${pathname}/review`}
                  state={{ film: film }}
                >Add review
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterSrc} alt={`${film.title} poster`} width="218" height="327" />
            </div>

            <Tabs film={film}/>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList filmData={fullFilmList.filter((item) => item.genre === film.genre).slice(1, 5)}/>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MovieScreen;
