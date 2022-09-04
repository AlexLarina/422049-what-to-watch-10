import {
  AppRoute,
  AuthStatus
} from '../../const';
import {
  Link,
  useNavigate
} from 'react-router-dom';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';

import { logoutAction } from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userBlockClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const avatarClickHandler = (evt: React.MouseEvent<HTMLElement>) => {
    navigate(AppRoute.UserFilmList);
  };

  return (
    authStatus === AuthStatus.NotAuth
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
          <div className="user-block__avatar" onClick={avatarClickHandler}>
            <img
              src={user?.avatarUrl}
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </li>
        <li className="user-block__item">
          <span
            style={{cursor: 'pointer'}}
            className="user-block__link"
            onClick={userBlockClickHandler}
          >
            Sign out
          </span>
        </li>
      </ul>
  );
}

export default UserBlock;
