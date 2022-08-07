import { AppRoute, AuthStatus } from '../../const';

import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
    children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
