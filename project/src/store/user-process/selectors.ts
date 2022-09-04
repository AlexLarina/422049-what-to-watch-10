import { AuthStatus, NameSpace } from '../../const';

import { State } from '../../types/state';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthStatus => (
  state[NameSpace.User].authorizationStatus
);

export const getUser = (state: State): UserData | null => (
  state[NameSpace.User].user
);
