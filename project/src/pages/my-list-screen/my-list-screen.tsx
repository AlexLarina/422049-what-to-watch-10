import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { getFavourites } from '../../store/film-process/selectors';
import { useAppSelector } from '../../hooks';

function MyListScreen(): JSX.Element {
  const favouriteFilms = useAppSelector(getFavourites);

  return (
    <div className="user-page">
      <Header headerClass='user-page__head'>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favouriteFilms.length}</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList filmData={favouriteFilms} />

      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
