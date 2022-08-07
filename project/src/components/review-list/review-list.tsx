import { useEffect, useState } from 'react';

import { APIRoute } from '../../const';
import { ApiReview } from '../../types/api';
import Review from '../review/review';
import api from '../../services/api';

type ReviewListProps = {
  filmID: number;
};

const getCommentsMiddleIndex = (comments: ApiReview[]) => (comments.length / 2) + 1;

function ReviewList({filmID}: ReviewListProps): JSX.Element {
  const [reviews, setReviews] = useState([] as ApiReview[]);
  const [isLoadingCompleted, setLoadingCompleted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await api.get<ApiReview[]>(`${APIRoute.Comments}/${filmID}`);
      // eslint-disable-next-line no-console
      console.log(data);
      setLoadingCompleted(!isLoadingCompleted);
      setReviews(data);
    };

    fetchData();
  }, []);

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
              .slice(0, getCommentsMiddleIndex(reviews))
              .map((review) => <Review review={review} key={`review-${review.id}`} />)}
          </div>
          <div className="film-card__reviews-col">
            {reviews
              .slice(getCommentsMiddleIndex(reviews))
              .map((review) => <Review review={review} key={`review-${review.id}`} />)}
          </div>
        </>
        : <p>No comments yet ... </p>}
    </div>
  );
}

export default ReviewList;
