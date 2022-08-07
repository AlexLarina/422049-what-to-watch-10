import Film from '../../types/film';
import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Header from '../../components/header/header';
import React from 'react';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {
  const filmList = useAppSelector((state) => state.filmList);
  const fullFilmList = useAppSelector((state) => state.fullFilmList);
  const promoFilm = useAppSelector((state) => state.promo) as Film;
  const favouritesCount = useAppSelector((state) => state.favouriteFilmList.length);

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.bigPosterSrc} alt={promoFilm.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <FilmPromo
          film={promoFilm}
          favouritesCount = {favouritesCount}
        />
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmData={fullFilmList}/>

          <FilmList filmData={filmList} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}
export default MainScreen;
