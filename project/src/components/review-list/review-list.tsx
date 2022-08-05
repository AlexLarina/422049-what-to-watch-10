import Film from '../../types/film';
import Review from '../review/review';

type ReviewListProps = {
  film: Film;
};

function ReviewList({film}: ReviewListProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <Review />
      </div>
      <div className="film-card__reviews-col">
        <Review />
      </div>
    </div>
  );
}

export default ReviewList;
