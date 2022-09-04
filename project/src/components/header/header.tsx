import {
  Link,
  useLocation,
} from 'react-router-dom';

import {
  AppRoute
} from '../../const';
import UserBlock from '../user-block/user-block';

type HeaderProps = {
  headerClass: string;
  children?: JSX.Element;
}

function Header({headerClass, children}: HeaderProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <header
      className={`page-header ${headerClass}`}
      data-testid="page-header"
    >
      <div className="logo">
        <Link
          className="logo__link"
          to={AppRoute.Root}
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      {pathname !== AppRoute.Login && <UserBlock />}
    </header>
  );
}

export default Header;
