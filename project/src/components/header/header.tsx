import { AppRoute, AuthStatus } from '../../const';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

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
            <div className="user-block__avatar">
              <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>}
    </header>
  );
}

export default Header;
