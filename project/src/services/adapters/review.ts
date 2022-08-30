import Review from '../../types/review';

export const adaptReviewToApi = (review: Review) => ({
  comment: review['review-text'],
  rating: Number(review.rating)
});
