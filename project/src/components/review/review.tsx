import { createReviewDate, createReviewDateTime } from '../../services/date';

import { ApiReview } from '../../types/api';

type ReviewProps = {
  review: ApiReview;
}

function Review({review}: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time
            className="review__date"
            dateTime={createReviewDateTime(review.date)}
          >
            {createReviewDate(review.date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default Review;
