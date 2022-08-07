import { MONTHS } from '../const';

export const createReviewDate = (date: string) => {
  const dateObject = new Date(date);
  return `${MONTHS[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
};

export const createReviewDateTime = (date: string) => {
  const dateObject = new Date(date);
  return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
};
