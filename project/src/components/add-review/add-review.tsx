import { APIRoute, MAX_RATE } from '../../const';

import RatePoint from '../rate-point/rate-point';
import api from '../../services/api';
import { useState } from 'react';

type AddReviewProps = {
  color: string;
  filmID: number;
}

function AddReview({color, filmID}: AddReviewProps): JSX.Element {
  const [formData, setFormData] = useState({
    rating: '',
    'review-text': '',
  });

  const onChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const postReviewData = async () => {
    const payload = {
      comment: formData['review-text'],
      rating: Number(formData.rating),
    };
    await api.post(`${APIRoute.Comments}/${filmID}`, payload);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postReviewData();
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {
              [...Array(MAX_RATE)]
                .map((value, idx, array) => <RatePoint key={`rate-point-${array.length - idx}`} pointID={array.length - idx} onChange={onChange}/> )
            }
          </div>
        </div>

        <div className="add-review__text" style={{ backgroundColor: color }}>
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={onChange}
            value={formData['review-text']}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReview;
