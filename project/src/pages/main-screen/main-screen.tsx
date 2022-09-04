import React, { useEffect, useState } from 'react';
import { filterFilms, getFilms, getGenre } from '../../store/film-process/selectors';

import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import { useAppSelector } from '../../hooks/index';

function MainScreen(): JSX.Element {
  const filmList = useAppSelector(getFilms);
  const currentGenre = useAppSelector(getGenre);
  const filmsByGenre = useAppSelector(filterFilms);
  const [films, setFilms] = useState(filmList);

  useEffect(() => {
    setFilms(filmsByGenre);
  }, [currentGenre]);

  return (
    <React.Fragment>
      <FilmPromo />
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList filmData={filmList}/>

          <FilmList filmData={films} />
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
}
export default MainScreen;
