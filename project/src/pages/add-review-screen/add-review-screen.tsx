import { Link, useLocation } from 'react-router-dom';

import AddReview from '../../components/add-review/add-review';
import Header from '../../components/header/header';
import { ReviewState } from '../../types/interface';

function AddReviewScreen(): JSX.Element {
  const location = useLocation();
  const { film } = location.state as ReviewState;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.bigPosterSrc} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header headerClass=''>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={`/films/${film.id}`}
                  replace
                >{film.title}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterSrc} alt={`${film.title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReview color={film.backgroundColor} filmID={film.id}/>
    </section>
  );
}

export default AddReviewScreen;
