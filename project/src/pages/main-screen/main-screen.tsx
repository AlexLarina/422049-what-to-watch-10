import { getAllFilms, getFilms } from '../../store/film-process/selectors';

import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import React from 'react';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {
  const filmList = useAppSelector(getFilms);
  const fullFilmList = useAppSelector(getAllFilms);

  return (
    <React.Fragment>
      <FilmPromo />
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
