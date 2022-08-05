import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import GenreList from '../../components/genre-list/genre-list';
import React from 'react';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {
  const filmList = useAppSelector((state) => state.filmList);
  const fullFilmList = useAppSelector((state) => state.fullFilmList);
  const promoFilm = filmList[0];

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.bigPosterSrc} alt={promoFilm.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <FilmPromo
          id = {promoFilm.id}
          bigPosterSrc = {promoFilm.bigPosterSrc}
          title = {promoFilm.title}
          posterSrc = {promoFilm.posterSrc}
          genre = {promoFilm.genre}
          year = {promoFilm.year}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmData={fullFilmList}/>

          <FilmList filmData={filmList} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}
export default MainScreen;
