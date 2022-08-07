import AddReview from '../../components/add-review/add-review';
import Header from '../../components/header/header';
import { ReviewState } from '../../types/interface';
import { useLocation } from 'react-router-dom';

function AddReviewScreen(): JSX.Element {
  const { film } = useLocation().state as ReviewState;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.bigPosterSrc} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterSrc} alt={`${film.title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReview color={film.backgroundColor}/>
    </section>
  );
}

export default AddReviewScreen;
