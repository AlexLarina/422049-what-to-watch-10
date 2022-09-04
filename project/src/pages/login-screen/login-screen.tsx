import { AppRoute, AuthStatus } from '../../const';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { loginAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';

const validateEmail = (email: string) => email
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

const validatePassword = (password: string) => password
  .match(/([a-zA-Z]+\d+)|(\d+[a-zA-Z]+)/gm);

function LoginScreen(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [hintMessage, setHintMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const showEmailError = formData.email !== '' && !validateEmail(formData.email);
  const showPasswordError = formData.password !== '' && !validatePassword(formData.password);

  useEffect(() => {
    if(authStatus === AuthStatus.Auth) {navigate(AppRoute.Root);}

    if(showEmailError) {
      setHintMessage('Please enter a valid email address');
    } else {
      setHintMessage('');
    }

    if(showPasswordError) {
      setHintMessage('Please enter a valid password with at least one letter and one digit');
    } else {
      setHintMessage('');
    }

    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password)
    ) {
      setSubmitDisabled(false);
    }
  }, [formData]);

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {type, value} = evt.target;
    setFormData({...formData, [type]: value});
  };

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(formData));
    navigate(AppRoute.Root);
  };

  return (
    <div className="user-page">
      <Header headerClass='user-page__head'>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          {
            hintMessage &&
            <div className="sign-in__message">
              <p>{hintMessage}</p>
            </div>
          }
          <div className="sign-in__fields">
            <div
              className={
                showEmailError
                  ? 'sign-in__field sign-in__field--error'
                  : 'sign-in__field'
              }
            >
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={changeHandler}
                value={formData['email']}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div
              className={
                showPasswordError
                  ? 'sign-in__field sign-in__field--error'
                  : 'sign-in__field'
              }
            >
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onChange={changeHandler}
                value={formData['password']}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              disabled={submitDisabled}
            >Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginScreen;
