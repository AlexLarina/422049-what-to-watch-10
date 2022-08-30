import { useEffect, useState } from 'react';

import { APIRoute } from '../../const';
import { ApiReview } from '../../types/api';
import Review from '../review/review';
import api from '../../services/api';

type ReviewListProps = {
  filmID: number;
};

function ReviewList({filmID}: ReviewListProps): JSX.Element {
  const [reviews, setReviews] = useState([] as ApiReview[]);
  const [isLoadingCompleted, setLoadingCompleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await api.get<ApiReview[]>(`${APIRoute.Comments}/${filmID}`);
      setLoadingCompleted(true);
      setReviews(data);
    };
    fetchData();
  }, [filmID]);

  if (!isLoadingCompleted) {
    return <p>Data loading...</p>;
  }

  return (
    <div className="film-card__reviews film-card__row">
      {reviews.length
        ?
        <>
          <div className="film-card__reviews-col">
            {reviews
              .map((review, i) => (i % 2 === 0) && <Review review={review} key={`review-${review.id}`} />)}
          </div>
          <div className="film-card__reviews-col">
            {reviews
              .map((review, i) => (i % 2 !== 0) && <Review review={review} key={`review-${review.id}`} />)}
          </div>
        </>
        : <p>No reviews yet ... </p>}
    </div>
  );
}

export default ReviewList;
