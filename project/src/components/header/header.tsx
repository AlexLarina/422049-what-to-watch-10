import {
  AppRoute,
  AuthStatus
} from '../../const';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';

import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const onAvatarClick = (evt: React.MouseEvent<HTMLElement>) => {
    navigate(AppRoute.UserFilmList);
  };

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {authStatus === AuthStatus.NotAuth
        ?
        <div className="user-block">
          <Link
            className="user-block__link"
            to={AppRoute.Login}
          >Sign in
          </Link>
        </div>
        :
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar" onClick={onAvatarClick}>
              <img
                src={user?.avatarUrl}
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
          <li className="user-block__item">
            <a
              className="user-block__link"
              onClick={onClick}
            >
              Sign out
            </a>
          </li>
        </ul>}
    </header>
  );
}

export default Header;
