import './add-review.css';

import {
  APIRoute,
  AppLimit,
  ReviewLength
} from '../../const';
import { useEffect, useState } from 'react';

import RatePoint from '../rate-point/rate-point';
import { adaptReviewToApi } from '../../services/adapters/review';
import api from '../../services/api';
import { redirectToRoute } from '../../store/action';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';

type AddReviewProps = {
  color: string;
  filmID: number;
}

function AddReview({color, filmID}: AddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    rating: '',
    'review-text': '',
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [processSubmit, setProcessSubmit] = useState(false);

  useEffect(() => {
    if (
      formData['review-text'].length < ReviewLength.Min ||
      formData['review-text'].length > ReviewLength.Max ||
      formData['rating'] === ''
    ) {
      setShowHint(true);
    } else {
      setShowHint(false);
      setSubmitDisabled(false);
    }

    return () => {
      formData['review-text'] = '';
      formData['rating'] = '';
    };

  }, [formData]);

  const handleReviewElementChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const postReviewData = async () => {
    const payload = adaptReviewToApi(formData);
    setProcessSubmit(true);

    await api.post(`${APIRoute.Comments}/${filmID}`, payload)
      .then(
        () => {
          dispatch(redirectToRoute(`films/${filmID}`));
        },
        (error) => {
          if (error.response) {
            error.response.data
              ? toast.warn(error.response.data.error)
              : toast.error(error.response.statusText);
          }
        }
      );
  };

  const handleReviewFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postReviewData();
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleReviewFormSubmit}>
        <fieldset disabled={processSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {
                [...Array(AppLimit.MaxRate)]
                  .map((value, idx, array) =>
                    (
                      <RatePoint
                        key={`rate-point-${array.length - idx}`}
                        pointID={array.length - idx}
                        onChange={handleReviewElementChange}
                      />
                    ) )
              }
            </div>
          </div>

          { showHint &&
        <div className='add-review__hint hint' style={{ backgroundColor: color }}>
          <p className="hint__text">
            Please write a comment between {ReviewLength.Min} and {ReviewLength.Max} symbols and set rating in order to submit your review
          </p>
        </div> }

          <div className="add-review__text" style={{ backgroundColor: color }}>
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              onChange={handleReviewElementChange}
              value={formData['review-text']}
              minLength={ReviewLength.Min}
              maxLength={ReviewLength.Max}
            >
            </textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={submitDisabled}
              >Post
              </button>
            </div>

          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default AddReview;
