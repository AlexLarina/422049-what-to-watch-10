import Review from '../../types/review';

export const reviewToApi = (review: Review) => ({
  comment: review['review-text'],
  rating: Number(review.rating)
});
